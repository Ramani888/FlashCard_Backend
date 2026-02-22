import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const env = process.env;

/**
 * Migration script to update Free Tier cloudStorage from 250 MB to 50 MB
 */
async function updateFreeTierStorage() {
    try {
        // Connect to MongoDB
        const mongoUri = env.DATABASE_URL || 'mongodb+srv://CVLCluster1:Ramani%407258@atlascluster.g9ls9b9.mongodb.net/FlashCard';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        const Tier = mongoose.connection.collection('Tier');

        // FREE_TIER_ID from constants
        const FREE_TIER_ID = '67071ee998a7cc35fc69856c';

        // Find the free tier
        const freeTier = await Tier.findOne({ _id: new mongoose.Types.ObjectId(FREE_TIER_ID) });

        if (!freeTier) {
            console.log('❌ Free Tier not found in database');
            await mongoose.connection.close();
            return;
        }

        console.log(`Found Free Tier: ${freeTier.name}`);
        console.log(`Current cloudStorage: ${freeTier.cloudStorage} ${freeTier.cloudeStorageUnit}`);

        // Update the cloudStorage from 250 to 50
        const result = await Tier.updateOne(
            { _id: new mongoose.Types.ObjectId(FREE_TIER_ID) },
            { $set: { cloudStorage: 50 } }
        );

        if (result.modifiedCount > 0) {
            console.log('\n✅ Free Tier cloudStorage updated successfully!');
            console.log('Updated: cloudStorage from 250 MB to 50 MB');
        } else {
            console.log('\n⚠️  No changes made. The value might already be 50 MB.');
        }

        // Verify the update
        const updatedTier = await Tier.findOne({ _id: new mongoose.Types.ObjectId(FREE_TIER_ID) });
        console.log(`\nVerification - New cloudStorage: ${updatedTier?.cloudStorage} ${updatedTier?.cloudeStorageUnit}`);

        // Close connection
        await mongoose.connection.close();
        console.log('\nConnection closed');
    } catch (error) {
        console.error('Error during migration:', error);
        process.exit(1);
    }
}

// Run the migration
updateFreeTierStorage();
