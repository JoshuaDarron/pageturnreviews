import { Knex } from 'knex';
import db from '../../db/db';

type Review = {
    title: string,
    authors: string,
    review: string,
    reason: string
    rating: number,
}

class Reviews {
    async findAll (title: string, authors: string): Promise<Review> {
        return db('reviews')
            .select({
                title,
                authors
            });
    }
}

export default new Reviews();
