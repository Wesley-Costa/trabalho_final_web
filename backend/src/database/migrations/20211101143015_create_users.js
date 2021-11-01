
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', function(table){
        table.blob('imagem').alter();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(table){
        table.dropColumn('imagem');
    })
};