import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
// Utilities
import { callout } from './utils/helpers';
import { APIError } from './utils/apiError';
// Libs
import { openAIChat } from './lib/openAI';

import Reviews from './components/review';

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

    let err, response
    ;[err, response] = await callout(Reviews.findAll(`${title}`, `${author}`))
    if (response) {
        res.json([{
            review: response.review,
            rating: response.rating,
            reason: response.reason
        }]);
    }

    // Make a request to the ChatGPT API
    ;[err, response] = await callout(openAIChat(message));
    // Handle error
    if (err) {
        return next(new APIError(err.message, err.status, true));
    }
    console.log(response);
    // Return the model's response to the client
    res.json([response]);
});
// Start server listening on PORT number
app.listen(PORT, function () {
    console.log(`Listening on PORT ${PORT}`);
});
