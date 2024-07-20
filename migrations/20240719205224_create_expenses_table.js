exports.up = function(knex) {
    return knex.schema.createTable('Expenses', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('Users');
      table.integer('category_id').unsigned().references('id').inTable('Categories');
      table.float('amount').notNullable();
      table.string('title').notNullable();
      table.text('description');
      table.datetime('expense_date').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Expenses');
  };
  