import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const env = process.env;

/**
 * Migration script to update storage limit from 250 MB to 50 MB for existing users
 */
async function updateStorageLimit() {
    try {
        // Connect to MongoDB
        const mongoUri = env.DATABASE_URL || 'mongodb+srv://CVLCluster1:Ramani%407258@atlascluster.g9ls9b9.mongodb.net/FlashCard';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        const UserStorage = mongoose.connection.collection('UserStorage');
        const UserStorageLogs = mongoose.connection.collection('UserStorageLogs');

        // Find all users with 250 MB storage
        const usersToUpdate = await UserStorage.find({
            storage: 250,
            unit: 'MB'
        }).toArray();

        console.log(`Found ${usersToUpdate.length} users with 250 MB storage`);

        let updatedCount = 0;
        let skippedCount = 0;

        for (const user of usersToUpdate) {
            // Check if user's covered storage exceeds the new limit (50 MB)
            if (user.coveredStorage > 50) {
                console.log(`⚠️  Skipping user ${user.userId} - covered storage (${user.coveredStorage} MB) exceeds new limit`);
                skippedCount++;
                continue;
            }

            // Update the user's storage limit
            await UserStorage.updateOne(
                { _id: user._id },
                { $set: { storage: 50 } }
            );

            // Add a log entry for this change
            await UserStorageLogs.insertOne({
                userId: user.userId,
                storage: -200, // Reduced by 200 MB (250 - 50)
                unit: 'MB',
                type: 'removed',
                note: 'Storage limit updated from 250 MB to 50 MB due to policy change.',
                createdAt: new Date(),
                updatedAt: new Date()
            });

            updatedCount++;
        }

        console.log(`\n✅ Migration completed!`);
        console.log(`Updated: ${updatedCount} users`);
        console.log(`Skipped: ${skippedCount} users (exceeded new limit)`);

        // Close connection
        await mongoose.connection.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Error during migration:', error);
        process.exit(1);
    }
}

// Run the migration
updateStorageLimit();
