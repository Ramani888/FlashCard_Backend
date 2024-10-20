"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const cors = require('cors');
const port = process.env.PORT || 3010;
const mongoUri = process.env.DATABASE_URL || 'mongodb+srv://CVLCluster1:Ramani%407258@atlascluster.g9ls9b9.mongodb.net/FlashCard';
mongoose_1.default.connect(mongoUri);
const database = mongoose_1.default.connection;
database.on('error', (error) => {
    console.log(error);
});
database.once('connected', () => {
    console.log('Database Connected');
});
app.use(cors());
app.use(express_1.default.json());
app.use('/api', routes_1.default);
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
