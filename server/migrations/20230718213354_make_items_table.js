/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('items', (table) => {
        table.increments();
        table.integer('user_id');
        table.foreign('user_id').references('users.id');
        table.string('item_name', 64);
        table.string('description', 512);
        table.integer('quantity');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('items');
};