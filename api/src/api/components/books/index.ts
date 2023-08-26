// Packages
import _ from 'lodash';
// Modules
import knex from '../../db/db';

class Books {
    async findOne (book: { title: string, authors: string }): Promise<any> {
        const { title, authors } = _.pick(book, 'title', 'authors');
        const [res] = await knex('books')
            .select()
            .where({ title, authors });
        return res;
    }

    async create (book: { title: string, authors: string }): Promise<any> {
        const [res] = await knex('books')
            .insert(book)
            .returning('id');
        return res;
    }
}

export default new Books();
