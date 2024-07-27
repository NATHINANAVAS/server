// server/seeds/update_savings_target.js

exports.seed = async function(knex) {
    // Update Mary Johnson's expected savings
    await knex('Users')
      .where({ first_name: 'Mary', last_name: 'Johnson' })
      .update({ expected_saving: 18000 });
  };
  