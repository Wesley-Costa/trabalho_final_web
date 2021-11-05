
exports.up = function(knex) {
    return knex.schema.dropTable('pets');
};

exports.down = function(knex) {
    return knex.schema.dropTable('pets');
};