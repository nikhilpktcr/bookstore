# bookstore

# #Getting Started
Please start the application using pnpm start:
pnpm start

The application allows:

Admins: Complete data manipulation.
Users: Sign up, log in, and purchase books.

# Sign Up
User
POST to http://localhost:5000/api/users/signUp
    {
        "userName": "john",
        "email": "john@mail.com",
        "password": "New123"
    }
POST to http://localhost:5000/api/users/logIn
ADMIN
body
    {
        "password": "Power123",
        "email": "admin@mail.com"
    }
USER
body
     {
        "password": "New123",
        "email": "john@mail.com"
    }

# Books
Get All
Full data:
GET http://localhost:5000/api/books/getAll?limit=1000&offset=0&order=ASC
Filtered data:
GET http://localhost:5000/api/books/getAll?limit=1000&offset=0&order=ASC&search=The

# Purchases for Users
POST to http://localhost:5000/api/purchases/buy
body
    {
    "bookId": 11,
    "quantity": 1
    }



