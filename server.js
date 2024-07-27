const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Adjust the path as necessary for your Knex configuration
const cors = require('cors');


const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

// Endpoint to get user details with spending and saving status
app.get('/userDetails', async (req, res) => {
  try {
    const users = await db('Users').select('*');
    const expenses = await db('Expenses').select('user_id', 'amount');

    const userDetails = users.map(user => {
      const userExpenses = expenses
        .filter(expense => expense.user_id === user.id)
        .reduce((acc, expense) => acc + parseFloat(expense.amount), 0);

      const remainingSavings = user.income - userExpenses;
      const status = remainingSavings >= user.expected_saving ? 'achieved' : 'failed';

      return {
        ...user,
        userExpenses,
        remainingSavings,
        status
      };
    });

    res.status(200).json(userDetails);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
});

// Endpoint to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await db('Users').select('*');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Endpoint to get all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await db('Categories').select('*');
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Endpoint to create a new expense
app.post('/expenses', async (req, res) => {
  const { title, amount, expense_date, category, user, description } = req.body;
  try {
    await db('Expenses').insert({
      title,
      amount,
      expense_date,
      category_id: category,
      user_id: user,
      description
    });
    res.status(201).json({ message: 'Expense created successfully' });
  } catch (error) {
    console.error('Error inserting expense:', error);
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

// Endpoint to get all transactions with optional filters
app.get('/transactions', async (req, res) => {
  const { user, category, month } = req.query;
  try {
    let query = db('Expenses')
      .join('Categories', 'Expenses.category_id', 'Categories.id')
      .join('Users', 'Expenses.user_id', 'Users.id')
      .select(
        'Expenses.id',
        'Expenses.title',
        'Expenses.amount',
        'Expenses.expense_date',
        'Categories.name as category',
        'Users.first_name',
        'Users.last_name'
      );

    if (user) {
      query = query.where('user_id', user);
    }

    if (category) {
      query = query.where('category_id', category);
    }

    if (month) {
      const paddedMonth = String(month).padStart(2, '0');
      query = query.whereRaw('strftime("%m", expense_date) = ?', [paddedMonth]);
    }


    const transactions = await query;
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

app.delete('/transactions', async (req, res) => {
  try {
    await db('Expenses').del();
    res.status(200).json({ message: 'All transactions deleted successfully' });
  } catch (error) {
    console.error('Error deleting transactions:', error);
    res.status(500).json({ error: 'Failed to delete transactions' });
  }
});

// Endpoint to create a new user
app.post('/users', async (req, res) => {
  const { firstName, lastName, income, expectedSaving } = req.body;
  try {
    await db('Users').insert({
      first_name: firstName,
      last_name: lastName,
      income,
      expected_saving: expectedSaving,
    });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
