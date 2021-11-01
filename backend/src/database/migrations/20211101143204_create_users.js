

exports.up = function(knex, Promise) {
    return knex.schema.alterTable('pets', function(table){
        table.blob('imagem').alter();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('pets', function(table){
        table.dropColumn('imagem');
    })
};