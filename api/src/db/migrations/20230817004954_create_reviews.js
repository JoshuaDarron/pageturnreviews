/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.raw(`
        CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            title TEXT,
            authors TEXT,
            review TEXT,
            reason TEXT,
            rating REAL
        );
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.raw(`
        DROP TABLE IF EXISTS reviews;
    `);
};
