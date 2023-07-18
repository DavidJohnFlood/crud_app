/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    await knex('user').del()
    await knex('user').insert([
      {first_name: 'Emily',    last_name: 'Johnson',  username: 'manager1', password: 'password'},
      {first_name: 'Benjamin', last_name: 'Thompson', username: 'manager2', password: 'password'},
      {first_name: 'Sophia',   last_name: 'Roberts',  username: 'manager3', password: 'password'},
      {first_name: 'Ethan',    last_name: 'Anderson', username: 'manager4', password: 'password'}
    ]);
  };