
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
    table.string('id').primary();
    table.string('email').notNullable();
    table.string('nome').notNullable();
    table.string('sobrenome').notNullable();
    table.integer('telefone').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
