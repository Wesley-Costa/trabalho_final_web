
exports.up = function(knex) {
    return knex.schema.table('userTeste', function(table){
        table.dropColumn('testeSB');
    })
};

exports.down = function(knex) {
    return knex.schema.table('userTeste', function(table){
        table.dropColumn('testeSB');
    })
};
