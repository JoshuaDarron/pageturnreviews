// Modules
import knex from '../../db/db';
import Books from '../books/';
// Types
import { Review } from './types';
import { Book } from '../books/types';
// Libs
import OpenAI from '../../lib/openAI';
// Class representing Reviews
class Reviews {
    /**
     * Find one review for a bookID in the database
     * 
     * @param {string} bookID - ID of the book we'd like reviews on
     *
     * @return {Promise<any>} Promise that resolves a review
     *
     * @example
     *
     *     await findOne(bookID);
     */
    async findOne (bookID: string): Promise<any> {
        const [review] = await knex('reviews')
            .select('review', 'reason', 'rating', 'type')
            .where({ book_id: bookID });
        return review;
    }
    /**
     * Create a book review in the database
     * 
     * @param {Review} review - Review to create
     *
     * @return {Promise<Review>} Promise that resolves a review ID
     *
     * @example
     *
     *     await create(review);
     */
    async create (review: Review): Promise<any> {
        const [id] = await knex('reviews').insert(review).returning('id');
        return id;
    }
    /**
     * Handle all either the creation of review from bot, or fetching from database
     * 
     * @param {Book} book - Book to review
     *
     * @return {Promise<[any]>} Promise that resolves a list reviews
     *
     * @example
     *
     *     await reviewBook(book);
     */
    async reviewBook (book: Book): Promise<[any]> {
        const { title, authors } = book;
        const message = `${title} By: ${authors}`;
        // Get a book
        let dbBook = await Books.findOne({ title, authors });
        if (!dbBook) {
            dbBook = await Books.create({ title, authors });
        }
        const bookID = dbBook.id;
        // Check db for instance
        const storedReview = await this.findOne(bookID);
        // If it doesn't exist, create it from chatGPT
        if (!storedReview) {
            // Make a request to the OpenAI API
            const botReview = await OpenAI.chat(message);
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
// Expose Reviews Class
export default new Reviews();
