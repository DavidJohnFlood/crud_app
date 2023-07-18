/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user', (table) => {
        table.increments();
        table.string('first_name', 32);
        table.string('last_name', 32);
        table.string('username', 32);
        table.string('password', 64);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user');
};
