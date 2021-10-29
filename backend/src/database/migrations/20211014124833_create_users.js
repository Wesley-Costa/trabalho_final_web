
exports.up = function (knex, Promise) {
  return knex.schema.table('userTeste', function (table) {
    table.string('testeSB');
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.table('userTeste', function (table) {
    table.dropColumn('testeSB')
  })
};
