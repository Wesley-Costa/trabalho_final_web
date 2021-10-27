
exports.up = function(knex) {
    return knex.schema.createTable('configuracao', function(table){
        table.string('id').primary();
        table.integer('vagas').notNullable();
        table.float('valorDiaria').notNullable();
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('configuracao');
};
