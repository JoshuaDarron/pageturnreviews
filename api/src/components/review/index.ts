// Modules
import knex from '../../db/db';
// Types
import { Review } from './types';
// Libs
import { openAIChat } from '../../lib/openAI';

class Reviews {
    async findOne (title: string, authors: string): Promise<any> {
        const [review] = await knex('reviews')
            .select('review', 'reason', 'rating', 'type')
            .where({ title, authors });
        return review;
    }

    async create (review: Review): Promise<Review> {
        return knex('reviews').insert(review);
    }

    async reviewBook (title: string, authors: string) {
        const message = `${title} By: ${authors}`;
        // Check db for instance
        const storedReview = await this.findOne(`${title}`, `${authors}`);
        // If it doesn't exist, create it from chatGPT
        if (!storedReview) {
            // Make a request to the ChatGPT API
            const botReview = await openAIChat(message);
            // Create review in db
            await this.create({
                title,
                authors,
                review: botReview.review,
                reason: botReview.reason,
                rating: botReview.rating,
                type: botReview.type
            });
            // Return the result from Bot
            return [botReview];
        }
        // Else return response from DB
        return [{
            review: storedReview.review,
            rating: storedReview.rating,
            reason: storedReview.reason
        }];
    }
}

export default new Reviews();
