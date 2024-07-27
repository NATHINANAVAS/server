// server/seeds/seed_expenses.js
const dayjs = require('dayjs');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Expenses').del();

  const users = await knex('Users').select('id', 'income', 'expected_saving');
  const categories = await knex('Categories').select('id');

  const getRandomCategory = () => categories[Math.floor(Math.random() * categories.length)].id;
  const getRandomAmount = (max) => (Math.random() * max).toFixed(2);
  const getRandomDate = (startMonth, endMonth) => dayjs(`2023-${Math.floor(Math.random() * (endMonth - startMonth + 1)) + startMonth}-${Math.floor(Math.random() * 28) + 1}`).format('YYYY-MM-DD');

  const expenses = [];

  // Define users who will not meet their savings target
  const usersNotMeetingTarget = [users[0], users[1]]; // First two users will not meet their savings target
  const userBarelyMeetingTarget = users[2]; // Third user will barely meet their savings target
  const usersMeetingTargetWell = users.slice(3); // Remaining users

  // Generate transactions for users not meeting target
  usersNotMeetingTarget.forEach(user => {
    let totalSpent = 0;
    while (totalSpent <= user.income - user.expected_saving + 500) { // Generate expenses to exceed the limit
      const amount = getRandomAmount(user.income / 20); // Generate larger expenses
      totalSpent += parseFloat(amount);
      expenses.push({
        title: `Expense ${expenses.length + 1}`,
        amount,
        expense_date: getRandomDate(1, 12),
        category_id: getRandomCategory(),
        user_id: user.id,
        description: `Description for expense ${expenses.length + 1}`
      });
    }
  });

  // Generate transactions for the user barely meeting the target
  let totalSpent = 0;
  while (totalSpent <= userBarelyMeetingTarget.income - userBarelyMeetingTarget.expected_saving) { // Barely meet the limit
    const amount = getRandomAmount(userBarelyMeetingTarget.income / 50); // Generate smaller expenses
    totalSpent += parseFloat(amount);
    expenses.push({
      title: `Expense ${expenses.length + 1}`,
      amount,
      expense_date: getRandomDate(1, 12),
      category_id: getRandomCategory(),
      user_id: userBarelyMeetingTarget.id,
      description: `Description for expense ${expenses.length + 1}`
    });
  }

  // Add one additional small expense to barely exceed the limit
  const additionalAmount = getRandomAmount(userBarelyMeetingTarget.income / 100);
  totalSpent += parseFloat(additionalAmount);
  expenses.push({
    title: `Additional Expense`,
    amount: additionalAmount,
    expense_date: getRandomDate(1, 12),
    category_id: getRandomCategory(),
    user_id: userBarelyMeetingTarget.id,
    description: `Additional description`
  });

  // Generate transactions for users meeting or exceeding target comfortably
  usersMeetingTargetWell.forEach(user => {
    let totalSpent = 0;
    while (totalSpent <= user.income - user.expected_saving - 500) { // Ensure they fall well within the limit
      const amount = getRandomAmount(user.income / 50); // Generate smaller expenses
      totalSpent += parseFloat(amount);
      expenses.push({
        title: `Expense ${expenses.length + 1}`,
        amount,
        expense_date: getRandomDate(1, 12),
        category_id: getRandomCategory(),
        user_id: user.id,
        description: `Description for expense ${expenses.length + 1}`
      });
    }
  });

  // Inserts seed entries
  await knex('Expenses').insert(expenses);
};
