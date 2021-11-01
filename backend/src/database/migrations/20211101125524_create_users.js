
exports.up = function(knex) {
    return knex.schema.createTable('reserva', function(table){
        table.string('id').primary();
        table.string('pet').notNullable();
        table.string('proprietario').notNullable();
        table.date('inicio').notNullable();
        table.date('fim').notNullable();
        table.string('status').notNullable();
        table.string('proprietario_id').references('id').inTable('users');
        table.string('pet_id').references('id').inTable('pets');
        table.float('valor').notNullable();
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('reserva');
};
