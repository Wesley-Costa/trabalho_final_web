
exports.up = function(knex) {
    return knex.schema.createTable('pets', function(table){
      table.string('id').primary();
      table.string('raca').notNullable();
      table.string('tamanho').notNullable();
      table.string('nome').notNullable();
      table.string('tipo').notNullable();
      table.string('imagem').notNullable();
      table.string('usuario_id').references('id').inTable('users');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('pets');
};
