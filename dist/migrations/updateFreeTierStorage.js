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
 * Migration script to update Free Tier cloudStorage from 250 MB to 50 MB
 */
function updateFreeTierStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            const mongoUri = env.DATABASE_URL || 'mongodb+srv://CVLCluster1:Ramani%407258@atlascluster.g9ls9b9.mongodb.net/FlashCard';
            yield mongoose_1.default.connect(mongoUri);
            console.log('Connected to MongoDB');
            const Tier = mongoose_1.default.connection.collection('Tier');
            // FREE_TIER_ID from constants
            const FREE_TIER_ID = '67071ee998a7cc35fc69856c';
            // Find the free tier
            const freeTier = yield Tier.findOne({ _id: new mongoose_1.default.Types.ObjectId(FREE_TIER_ID) });
            if (!freeTier) {
                console.log('❌ Free Tier not found in database');
                yield mongoose_1.default.connection.close();
                return;
            }
            console.log(`Found Free Tier: ${freeTier.name}`);
            console.log(`Current cloudStorage: ${freeTier.cloudStorage} ${freeTier.cloudeStorageUnit}`);
            // Update the cloudStorage from 250 to 50
            const result = yield Tier.updateOne({ _id: new mongoose_1.default.Types.ObjectId(FREE_TIER_ID) }, { $set: { cloudStorage: 50 } });
            if (result.modifiedCount > 0) {
                console.log('\n✅ Free Tier cloudStorage updated successfully!');
                console.log('Updated: cloudStorage from 250 MB to 50 MB');
            }
            else {
                console.log('\n⚠️  No changes made. The value might already be 50 MB.');
            }
            // Verify the update
            const updatedTier = yield Tier.findOne({ _id: new mongoose_1.default.Types.ObjectId(FREE_TIER_ID) });
            console.log(`\nVerification - New cloudStorage: ${updatedTier === null || updatedTier === void 0 ? void 0 : updatedTier.cloudStorage} ${updatedTier === null || updatedTier === void 0 ? void 0 : updatedTier.cloudeStorageUnit}`);
            // Close connection
            yield mongoose_1.default.connection.close();
            console.log('\nConnection closed');
        }
        catch (error) {
            console.error('Error during migration:', error);
            process.exit(1);
        }
    });
}
// Run the migration
updateFreeTierStorage();
