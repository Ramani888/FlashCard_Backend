import multer from 'multer';
import { S3 } from 'aws-sdk'; // Using aws-sdk v2 for s3.upload()
import dotenv from 'dotenv';

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
export const uploadToS3 = async (file: Express.Multer.File, bucketName?: string): Promise<string> => {
  const params = {
    Bucket: bucketName || 'flashcard-images-v1',
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

export default upload;
