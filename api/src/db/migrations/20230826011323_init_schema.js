/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.raw(`
        CREATE TABLE IF NOT EXISTS books (
            id SERIAL PRIMARY KEY,
            title TEXT,
            authors TEXT
        );

        CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            review TEXT,
            reason TEXT,
            rating REAL,
            type TEXT,
            book_id INTEGER REFERENCES books (id)
        );

        CREATE INDEX books_title_and_authors ON books (title, authors);
        CREATE INDEX reviews_book_id ON reviews (book_id);
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.raw(`
        DROP INDEX IF EXISTS reviews_book_id;
        DROP INDEX IF EXISTS books_title_and_authors;

        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS books;
    `);
};
