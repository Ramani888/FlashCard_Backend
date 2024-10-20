import express from 'express';
import { MongoClient } from 'mongodb';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import routes from './routes/routes'
import axios from 'axios';
import OpenAI from "openai";

dotenv.config();

const app = express();
const cors = require('cors')
const port = process.env.PORT || 3010;
const mongoUri = process.env.DATABASE_URL || 'mongodb+srv://CVLCluster1:Ramani%407258@atlascluster.g9ls9b9.mongodb.net/FlashCard';

mongoose.connect(mongoUri);
const database = mongoose.connection;

database.on('error', (error: any) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.get('/', (req, res) => res.json("server working...."));
app.get('*', (req, res) => res.json("API route not found"));

// Get OpenAI API key from the environment variables
// const openaiApiKey = process.env.API_KEY;

// const openai = new OpenAI({
//   apiKey: process.env.API_KEY // Use your environment variable to load API key
// });

// app.post('/api/chat', async (req, res) => {
//   const { message } = req.body;

//   try {
//     // Use 'gpt-3.5-turbo' as the new model
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: message }],
//       max_tokens: 200,
//     });

//     // Send the completion response
//     res.json({ response: completion.choices[0].message.content });
//   } catch (error) {
//     // Handle any API errors
//     res.status(500).json({ error: error });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
