
exports.up = function(knex, Promise) {
  knex.schema.table('userTeste', function(table){
      table.string('sobrenome').notNullable()
  })
};

exports.down = function(knex, Promise) {
  knex.schema.table('userTeste', function(table){
      table.dropColumn('sobrenome')
  })
};
