# Server Documentation

## Technologies Used
node
express
sqllite3
knex

## DB Schema

### user Table

```sql
CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    income REAL NOT NULL,
    expected_saving REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

```

``` sql

CREATE TABLE Categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    category_id INTEGER,
    amount REAL NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    expense_date DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);

```

## Folder Structure

``` tree

├── server
│   ├── db.js
│   ├── migrations
│   │   ├── YYYYMMDDHHMMSS_create_users_table.js
│   │   ├── YYYYMMDDHHMMSS_create_categories_table.js
│   │   ├── YYYYMMDDHHMMSS_create_expenses_table.js
│   ├── seeds
│   │   ├── seed_users.js
│   │   ├── seed_categories.js
│   ├── knexfile.js
│   ├── package.json
│   ├── server.js

```
