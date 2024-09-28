import multer from 'multer';
import { S3 } from 'aws-sdk'; // Using aws-sdk v2 for s3.upload() and deleteObject()
import dotenv from 'dotenv';
import { URL } from 'url'; // To help extract the file key from the S3 URL

dotenv.config();

// Multer configuration for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize S3 client using environment variables
const s3 = new S3({
  region: process.env.AWS_REGION, 
  accessKeyId: process.env.AWS_ACCESSKEYID, 
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
});

// Function to upload a file to S3
export const uploadToS3 = async (file: Express.Multer.File, bucketName: string): Promise<string> => {
  const params = {
    Bucket: bucketName,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  try {
    // Upload file using s3.upload() from aws-sdk v2
    const uploadResult = await s3.upload(params).promise();

    // Return the file's public URL in S3
    return uploadResult.Location; // S3 automatically provides the file URL
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Error uploading to S3');
  }
};

export const deleteFromS3 = async (fileUrl: string, bucketName: string): Promise<void> => {
  try {
    const bucket = bucketName;

    // Extract key from URL and decode it
    const key = extractKeyFromObjectUrl(fileUrl, bucket);

    const params = {
      Bucket: bucket,
      Key: key,
    };

    // Attempt to delete the file from S3
    await s3.deleteObject(params).promise();

    console.log(`File deleted successfully: ${fileUrl}`);
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw new Error('Error deleting file from S3');
  }
};

const extractKeyFromObjectUrl = (fileUrl: string, bucketName: string): string => {
  try {
    const url = new URL(fileUrl);
    let key = url.pathname.replace(`/${bucketName}/`, '');

    // Ensure there's no leading slash in the key
    if (key.startsWith('/')) {
      key = key.substring(1);
    }

    // Decode any URL-encoded characters in the key
    key = decodeURIComponent(key);

    console.log('Extracted key:', key); // Debugging log to verify key
    return key;
  } catch (error) {
    console.error('Error extracting key from Object URL:', error);
    throw new Error('Invalid S3 URL');
  }
};

export default upload;
