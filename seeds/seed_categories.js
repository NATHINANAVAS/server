// seeds/seed_categories.js
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('Categories').insert([
        {name: 'Groceries'},
        {name: 'Rent'},
        {name: 'Transport'},
        {name: 'Entertainment'},
        {name: 'Other'}
      ]);
    });
};
