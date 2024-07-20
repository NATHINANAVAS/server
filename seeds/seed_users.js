// seeds/seed_users.js
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('Users').del()
      .then(function () {
        // Inserts seed entries
        return knex('Users').insert([
          {first_name: 'Adam', last_name: 'Smith', income: 60000, expected_saving: 15000},
          {first_name: 'John', last_name: 'Doe', income: 55000, expected_saving: 12000},
          {first_name: 'Mary', last_name: 'Johnson', income: 70000, expected_saving: 20000},
          {first_name: 'Alexa', last_name: 'Brown', income: 80000, expected_saving: 25000}
        ]);
      });
  };
  