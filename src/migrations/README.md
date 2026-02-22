# Storage Limit Update Migration

## Summary
Storage limit has been updated from **250 MB** to **50 MB** for free tier users.

## Changes Made

### 1. Updated Constants
- File: `src/utils/constants/general.ts`
- Changed `FREE_TIER.storage` from `250` to `50`

### 2. Impact
- **New users**: Will automatically get 50 MB storage
- **Existing users**: Need to be updated using the migration scripts below

## Migration Options

### Option 1: TypeScript Migration Script (Recommended)

Run the TypeScript migration script:

```bash
npx ts-node src/migrations/updateStorageLimit.ts
```

This script will:
- Find all users with 250 MB storage
- Update them to 50 MB (if their covered storage is ≤ 50 MB)
- Skip users who have already used more than 50 MB
- Create log entries in UserStorageLogs for each update

### Option 2: MongoDB Shell Script

If you prefer to run the migration directly in MongoDB:

1. Open MongoDB shell or MongoDB Compass
2. Select your database
3. Run the commands from `src/migrations/updateStorageLimit.mongodb.js`

```bash
# Using MongoDB shell
mongo <your-connection-string>/<database-name> src/migrations/updateStorageLimit.mongodb.js
```

## Important Considerations

### Users Exceeding New Limit
Users who have already used more than 50 MB of storage will be:
- **Skipped** in the migration (they keep 250 MB)
- You need to decide the policy for these users:
  - Option A: Let them keep the 250 MB (grandfathered)
  - Option B: Allow them to keep data but prevent new uploads
  - Option C: Force them to delete data or upgrade

### Testing
Before running in production:
1. **Backup your database**
2. Test on a staging/development environment
3. Review the list of users who exceed 50 MB
4. Decide on policy for edge cases

### Query to Find Users Exceeding New Limit

```javascript
db.UserStorage.find({ 
    storage: 250, 
    unit: "MB",
    coveredStorage: { $gt: 50 }
}).pretty()
```

## Verification

After migration, verify the results:

```javascript
// Count users with new limit
db.UserStorage.countDocuments({ storage: 50, unit: "MB" })

// Count users still with old limit
db.UserStorage.countDocuments({ storage: 250, unit: "MB" })

// Check logs were created
db.UserStorageLogs.find({ 
    note: "Storage limit updated from 250 MB to 50 MB due to policy change." 
}).count()
```

## Rollback

If you need to rollback:

```javascript
// Rollback storage limits
db.UserStorage.updateMany(
    { storage: 50, unit: "MB" },
    { $set: { storage: 250 } }
)

// Remove migration logs
db.UserStorageLogs.deleteMany({
    note: "Storage limit updated from 250 MB to 50 MB due to policy change."
})
```

Don't forget to also revert the constant in `src/utils/constants/general.ts` back to 250.
