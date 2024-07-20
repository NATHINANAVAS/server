// knexfile.js
const path = require('path');
const dbPath = path.join(__dirname, 'budgetbuddy.db');
console.log('Database path:', dbPath); // Add this line to debug the path

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'budgetbuddy.db')
    },
    useNullAsDefault: true
  }
};
