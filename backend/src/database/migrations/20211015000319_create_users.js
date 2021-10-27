
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(table){
        table.string('senha').notNullable();
        table.string('funcao');
        table.date('dataCadastro');
        table.string('imagem');
        table.string('status');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(table){
        table.dropColumn('senha');
        table.dropColumn('senha');
        table.dropColumn('funcao');
        table.dropColumn('dataCadastro');
        table.dropColumn('imagem');
        table.dropColumn('status');
    })
};
