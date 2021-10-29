
exports.up = function (knex) {
    knex.schema.table('reserva', function (table) {
        table.dropColumn('teste')
    })
};

exports.down = function (knex) {
    knex.schema.table('reserva', function (table) {
        table.dropColumn('teste')
    })
};
