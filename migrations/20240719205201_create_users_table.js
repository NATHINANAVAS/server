exports.up = function(knex) {
    return knex.schema.createTable('Users', function(table) {
      table.increments('id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.float('income').notNullable();
      table.float('expected_saving').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Users');
  };
  