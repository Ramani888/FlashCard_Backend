# Storage Logic Summary - FlashCard Backend

## ✅ Changes Completed

### 1. **Constants Updated** 
- **File**: [src/utils/constants/general.ts](src/utils/constants/general.ts)
- **Change**: `FREE_TIER.storage` updated from `250` to `50` MB
- **Impact**: All new signups will get 50 MB storage

### 2. **Database Updates Completed**

#### A. User Storage Records
- **Script**: [src/migrations/updateStorageLimit.ts](src/migrations/updateStorageLimit.ts)
- **Result**: ✅ Updated 61 users from 250 MB to 50 MB
- **Logs Created**: Yes, in `UserStorageLogs` collection

#### B. Free Tier Document
- **Script**: [src/migrations/updateFreeTierStorage.ts](src/migrations/updateFreeTierStorage.ts)
- **Result**: ✅ Updated FREE tier cloudStorage from 250 MB to 50 MB
- **Tier ID**: `67071ee998a7cc35fc69856c`
- **Impact**: Subscription cancellations will now use 50 MB limit

---

## 📍 Storage Logic Locations

### 1. **User Signup** 
**File**: [src/controllers/signUp.controller.ts](src/controllers/signUp.controller.ts)
```typescript
// Lines 77-83: When new user signs up
await createUserStorageData({ 
    userId: newUserId?.toString(), 
    storage: FREE_TIER?.storage,  // ✅ Now 50 MB
    unit: FREE_TIER?.storageUnit,
    coveredStorage: 0,
    coveredStorageUnit: FREE_TIER?.storageUnit 
});
```
**Status**: ✅ Uses FREE_TIER constant (already updated)

---

### 2. **Image Upload/Update/Delete**
**File**: [src/controllers/images.controller.ts](src/controllers/images.controller.ts)

#### Operations:
- **Upload Image** (Line 29-51): Checks storage before upload, updates covered storage
- **Update Image** (Line 76-116): Removes old image storage, adds new image storage
- **Delete Image** (Line 161-183): Reduces covered storage

#### Key Function:
```typescript
const result = calculateStorage(
    userStorageData?.storage,      // Max allowed (50 MB)
    userStorageData?.unit,
    userStorageData?.coveredStorage, // Currently used
    userStorageData?.coveredStorageUnit,
    fileSize?.size,                  // New file size
    fileSize?.unit,
    'added' | 'deleted'             // Operation type
);
```
**Status**: ✅ Dynamic - uses user's current storage limit from database

---

### 3. **PDF Upload/Update/Delete**
**File**: [src/controllers/pdf.controller.ts](src/controllers/pdf.controller.ts)

#### Operations:
- **Upload PDF** (Line 29-51): Same logic as images
- **Update PDF** (Line 60-120): Same logic as images
- **Delete PDF** (Line 155+): Same logic as images

**Status**: ✅ Dynamic - uses user's current storage limit from database

---

### 4. **Subscription Management**
**File**: [src/controllers/subscription.controller.ts](src/controllers/subscription.controller.ts)

#### A. Update Subscription (Line 30-52)
```typescript
const tierData = await getTierDataById(bodyData?.tierId);
await updateUserStorageLimitData({
    storage: Number(tierData?.cloudStorage),
    unit: String(tierData?.cloudeStorageUnit),
    userId: bodyData?.userId
});
```

#### B. Cancel Subscription (Line 86-103)
```typescript
// Reverts user to FREE tier
const tierData = await getTierDataById(FREE_TIER_ID);
await updateUserStorageLimitData({
    storage: Number(tierData?.cloudStorage),  // ✅ Now 50 MB
    unit: String(tierData?.cloudeStorageUnit),
    userId
});
```
**Status**: ✅ Uses Tier document (already updated in database)

---

### 5. **Storage Calculation Helper**
**File**: [src/utils/helpers/general.ts](src/utils/helpers/general.ts)

#### Function: `calculateStorage`
- **Purpose**: Validates if new file can be added without exceeding limit
- **Returns**: `false` if exceeds limit, otherwise returns updated storage values
- **Logic**: 
  - Converts all units to bytes
  - Adds/subtracts based on operation type
  - Compares against max storage limit
  - Returns updated covered storage

**Status**: ✅ Generic function - works with any storage limit

---

### 6. **User Profile**
**File**: [src/services/profile.service.ts](src/services/profile.service.ts)
- **Line 67**: Fetches user storage data for profile display
**Status**: ✅ Read-only - displays current values

---

### 7. **Database Models**

#### A. UserStorage Model
**File**: [src/models/userStorage.model.ts](src/models/userStorage.model.ts)
```typescript
{
    userId: String,
    storage: Number,           // Max allowed (50 MB)
    unit: String,              // "MB"
    coveredStorage: Number,    // Currently used
    coveredStorageUnit: String
}
```

#### B. Tier Model
**File**: [src/models/tier.model.ts](src/models/tier.model.ts)
```typescript
{
    name: String,
    cloudStorage: Number,      // 50 MB for FREE tier
    cloudeStorageUnit: String,
    credit: Number,
    // ... other fields
}
```

---

## 🔍 How Storage Validation Works

### Flow Diagram:
```
User uploads file
    ↓
calculateFileSizeInMB() → Get file size in MB
    ↓
getUserStorageData() → Get user's current storage limits
    ↓
calculateStorage() → Check if adding file exceeds limit
    ↓
    ├─ FALSE → Return error "Exceeds maximum storage limit"
    └─ TRUE → Continue
         ↓
         Upload file to S3
         ↓
         updateUserStorageData() → Update covered storage
         ↓
         createUserStorageLogsData() → Log the change
```

### Storage Check Logic:
```typescript
if (coveredStorage + newFileSize > maxStorage) {
    return false; // Cannot upload
}
return {
    updatedCoveredStorageSize: coveredStorage + newFileSize,
    updatedCoveredStorageUnit: maxUnit
};
```

---

## 📊 Database Collections Using Storage

1. **UserStorage** - Current user storage limits and usage
2. **UserStorageLogs** - History of all storage changes
3. **Tier** - Storage limits for different subscription tiers
4. **Images** - Stores image metadata (storage calculated from S3)
5. **Pdf** - Stores PDF metadata (storage calculated from S3)

---

## ✅ Summary

### All Storage Logic is Covered
1. ✅ **Signup**: Uses FREE_TIER constant (updated to 50 MB)
2. ✅ **Uploads**: Dynamic validation against user's current limit
3. ✅ **Subscriptions**: Uses Tier document (updated to 50 MB)
4. ✅ **Existing Users**: Migrated from 250 MB to 50 MB
5. ✅ **Free Tier Record**: Updated in database

### No Hardcoded Values Found
- All storage checks use dynamic values from database
- Only constant is FREE_TIER in general.ts (already updated)
- Tier document FREE tier now has 50 MB (already updated)

### Everything is Consistent
Your entire application now uses **50 MB** as the free tier storage limit! 🎉
