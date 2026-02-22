// MongoDB Shell Script to update storage limit from 250 MB to 50 MB
// Run this script in MongoDB shell or MongoDB Compass

// 1. Check how many users will be affected
db.UserStorage.countDocuments({ storage: 250, unit: "MB" })

// 2. View users who exceed the new limit (50 MB)
db.UserStorage.find({ 
    storage: 250, 
    unit: "MB",
    coveredStorage: { $gt: 50 }
}).pretty()

// 3. Update users whose covered storage is within the new limit
db.UserStorage.updateMany(
    { 
        storage: 250, 
        unit: "MB",
        coveredStorage: { $lte: 50 }
    },
    { 
        $set: { storage: 50 } 
    }
)

// 4. Add log entries for updated users
db.UserStorage.find({ 
    storage: 50, 
    unit: "MB",
    coveredStorage: { $lte: 50 }
}).forEach(function(user) {
    db.UserStorageLogs.insertOne({
        userId: user.userId,
        storage: -200,
        unit: "MB",
        type: "removed",
        note: "Storage limit updated from 250 MB to 50 MB due to policy change.",
        createdAt: new Date(),
        updatedAt: new Date()
    });
});

// 5. Verify the update
db.UserStorage.countDocuments({ storage: 50, unit: "MB" })

// 6. Check for users who still have 250 MB (they exceeded the new limit)
db.UserStorage.find({ storage: 250, unit: "MB" }).pretty()
