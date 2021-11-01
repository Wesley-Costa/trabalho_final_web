
exports.up = function(knex) {
    return knex.schema.dropTable('reserva');
};

exports.down = function(knex) {
    return knex.schema.dropTable('reserva');
};
