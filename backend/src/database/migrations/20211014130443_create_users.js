
exports.up = function(knex) {
    return knex.schema.dropTable('userTeste');
};

exports.down = function(knex) {
    return knex.schema.dropTable('userTeste');
};
