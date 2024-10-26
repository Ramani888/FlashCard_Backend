import bcrypt from 'bcryptjs';

export const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

export const getIssueSentence = (supportType: string) => {
    switch (supportType) {
        case 'Bug Report':
            return 'A new Bug Report has been successfully submitted by the user. Please review the details and take the necessary action.'
        case 'Feedback':
            return 'The user has submitted Feedback. Please check the details and provide a response as needed.'
        case 'Issues':
            return 'An Issue has been reported by the user. Kindly review the submission and address it promptly.'
        case 'Suggestions':
            return 'A new Suggestion has been submitted by the user. Please take a look and consider it for future improvements.'
        case 'ETC':
            return 'A user has submitted an issue under the category ETC. Please review the information and respond accordingly.'
        default:
            return 'A new Bug Report has been successfully submitted by the user. Please review the details and take the necessary action.'    
    }
}

export const calculateFileSizeInMB = (sizeInBytes: number): {size: number, unit: string} => {
    const sizeInMB = sizeInBytes / (1024 * 1024); // Convert bytes to MB
    return {
        size: parseFloat(sizeInMB.toFixed(2)),
        unit: 'mb'
    }
}

type StorageUnit = 'kb' | 'mb' | 'gb';
type StorageOperation = 'added' | 'deleted';
interface StorageResult {
    updatedCoveredStorageSize: number;
    updatedCoveredStorageUnit: StorageUnit;
}

export const calculateStorage = (
    maxSize: number,
    maxUnit: StorageUnit,
    coveredSize: number,
    coveredUnit: StorageUnit,
    newSize: number,
    newUnit: StorageUnit,
    operationType: StorageOperation
) => {
    const unitToBytes: Record<StorageUnit, number> = {
        kb: 1024,
        mb: 1024 ** 2,
        gb: 1024 ** 3
    };

    // Helper function to convert any storage size to bytes
    function toBytes(size: number, unit: StorageUnit): number {
        return size * unitToBytes[unit.toLowerCase() as StorageUnit];
    }

    // Helper function to round small floating-point numbers to avoid precision issues
    function roundToPrecision(value: number, precision: number = 12): number {
        return parseFloat(value.toPrecision(precision));
    }

    // Convert all sizes to bytes for calculation
    const maxStorageBytes = toBytes(maxSize, maxUnit);
    const coveredStorageBytes = toBytes(coveredSize, coveredUnit);
    const newStorageBytes = toBytes(newSize, newUnit);

    // Initialize updatedStorageBytes with a default value
    let updatedStorageBytes: number;

    if (operationType === 'added') {
        updatedStorageBytes = coveredStorageBytes + newStorageBytes;
    } else if (operationType === 'deleted') {
        // Prevent subtraction if covered storage is zero
        if (coveredStorageBytes > 0) {
            updatedStorageBytes = coveredStorageBytes - newStorageBytes;
        } else {
            updatedStorageBytes = 0; // Prevent negative storage
        }
    } else {
        throw new Error('Invalid operation type');
    }

    // Round updated storage bytes to avoid floating-point precision issues
    updatedStorageBytes = roundToPrecision(updatedStorageBytes);

    // Check if the updated storage would exceed the maximum allowed
    if (updatedStorageBytes > maxStorageBytes) {
        return false; // Exceeds max storage
    }

    // Convert back to the max storage unit for consistency
    const updatedStorage = updatedStorageBytes / unitToBytes[maxUnit];

    return {
        updatedCoveredStorageSize: roundToPrecision(updatedStorage), // Round the final result for consistency
        updatedCoveredStorageUnit: maxUnit
    };
};

export const encryptPassword = (password: string) => {
    return new Promise((resolve) => {
      bcrypt.genSalt(5, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
          return resolve(hash);
      });
      });
    });
};

export const comparePassword = (storedPassword: string, validatePassword: string): Promise<boolean> => {
    if (storedPassword === validatePassword) {
        return Promise.resolve(true);
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(storedPassword, validatePassword, (err: Error | null, res: boolean) => {
        if (err) return reject(err);
        return res ? resolve(res) : reject(new Error('Passwords do not match.'));
      });
    });
};