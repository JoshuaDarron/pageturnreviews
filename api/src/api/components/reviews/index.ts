// Modules
import knex from '../../db/db';
import Books from '../books/';
// Types
import { Review } from './types';
// Libs
import { openAIChat } from '../../lib/openAI';

class Reviews {
    async findOne (bookID: string): Promise<any> {
        const [review] = await knex('reviews')
            .select('review', 'reason', 'rating', 'type')
            .where({ book_id: bookID });
        return review;
    }

    async create (review: Review): Promise<any> {
        const [id] = await knex('reviews').insert(review).returning('id');
        return id;
    }

    async reviewBook (title: string, authors: string) {
        const message = `${title} By: ${authors}`;
        // Get a book
        let book = await Books.findOne({ title, authors });
        if (!book) {
            book = await Books.create({ title, authors });
        }
        const bookID = book.id;
        // Check db for instance
        const storedReview = await this.findOne(bookID);
        // If it doesn't exist, create it from chatGPT
        if (!storedReview) {
            // Make a request to the ChatGPT API
            const botReview = await openAIChat(message);
            // Create review in db
            await this.create({
                ...botReview,
                book_id: bookID
            });
            // Return the result from Bot
            return [botReview];
        }
        // Else return response from DB
        return [{
            review: storedReview.review,
            rating: storedReview.rating,
            reason: storedReview.reason,
            type: storedReview.type
        }];
    }
}

export default new Reviews();
