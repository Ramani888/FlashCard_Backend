import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import routes from './routes/routes'
dotenv.config();

const app = express();
const cors = require('cors')
const port = process.env.PORT || 3010;
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://CVLCluster1:Ramani%407258@atlascluster.g9ls9b9.mongodb.net/VR_Fashion';

const client = new MongoClient(mongoUri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

connectToMongoDB();

app.use(cors());
app.use('/api', routes);
app.get('/', (req, res) => res.json("server working...."));
app.get('*', (req, res) => res.json("API route not found"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
