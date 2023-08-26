// Modules
import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
// Utilities
import { APIError } from './api/utils/';
// Components
import routes from './api/router/router';
// PORT number to listen too
const PORT = process.env.PORT || 8000;
// Create app
const app: Express = express();
app.use(cors());
// Parse JSON bodies
app.use(express.json());
// Define a POST route for the chat endpoint
app.use('/', routes);
/** Handle all non defined routes */
app.use((req, res, next) => {
    const err = new APIError('Not Found');
    err.status = 404;
    next(err);
});
/** Error Handle */
app.use((err: APIError, req: Request, res: Response, next: NextFunction) => {
    const message = err.message.split('|');
    let statusCode = err.status || 500;
    if (message[1]) statusCode = +message[1];
    return res.status(statusCode).json({ message: message[0], error: err.stack });
});
// Start server listening on PORT number
app.listen(PORT, function () {
    console.log(`Listening on PORT ${PORT}`);
});
