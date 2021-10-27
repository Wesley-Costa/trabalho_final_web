
exports.up = function(knex) {
    return knex.schema.createTable('userTeste', function(table){
        table.string('id').primary();
        table.string('nome').notNullable();
        table.integer('idade').notNullable();
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('userTest');
};
