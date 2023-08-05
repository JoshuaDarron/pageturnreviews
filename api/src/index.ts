import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
// Utilities
import { callout } from './utils/helpers';
import { APIError } from './utils/apiError';
// Libs
import { openAIChat } from './lib/openAI';
// PORT number to listen too
const PORT = process.env.PORT || 8000;
// Create app
const app: Express = express();
app.use(cors());
// Parse JSON bodies
app.use(express.json());
// Define a POST route for the chat endpoint
app.get('/review', async (req: Request, res: Response, next: NextFunction) => {
    const { title, author } = req.query;
    const message = `${title} By: ${author}`;
    // Make a request to the ChatGPT API
    const [err, response] = await callout(openAIChat(message));
    // Handle error
    if (err) {
        return next(new APIError(err.message, err.status, true));
    }
    // Return the model's response to the client
    res.json([response]);
});
// Start server listening on PORT number
app.listen(PORT, function () {
    console.log(`Listening on PORT ${PORT}`);
});
