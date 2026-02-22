"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
// Load environment variables
dotenv.config();
const env = process.env;
/**
 * Migration script to update storage limit from 250 MB to 50 MB for existing users
 */
function updateStorageLimit() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            const mongoUri = env.DATABASE_URL || 'mongodb+srv://CVLCluster1:Ramani%407258@atlascluster.g9ls9b9.mongodb.net/FlashCard';
            yield mongoose_1.default.connect(mongoUri);
            console.log('Connected to MongoDB');
            const UserStorage = mongoose_1.default.connection.collection('UserStorage');
            const UserStorageLogs = mongoose_1.default.connection.collection('UserStorageLogs');
            // Find all users with 250 MB storage
            const usersToUpdate = yield UserStorage.find({
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
                yield UserStorage.updateOne({ _id: user._id }, { $set: { storage: 50 } });
                // Add a log entry for this change
                yield UserStorageLogs.insertOne({
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
            yield mongoose_1.default.connection.close();
            console.log('Connection closed');
        }
        catch (error) {
            console.error('Error during migration:', error);
            process.exit(1);
        }
    });
}
// Run the migration
updateStorageLimit();
