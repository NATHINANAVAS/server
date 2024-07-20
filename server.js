const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Adjust the path as necessary for your Knex configuration

const app = express();
const port = 8080;

app.use(bodyParser.json());

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
