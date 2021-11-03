
exports.up = function (knex) {
    knex.schema.table('reserva', function (table) {
        table.string('notas')
    })
};

exports.down = function (knex) {
    knex.schema.table('reserva', function (table) {
        table.dropColumn('notas')
    })
};
