from db import Database
from models.User import User


def get_users():
    pool = Database()
    cursor = pool.get_cursor()  # Get a connection object
    cursor.execute('SELECT * FROM users')
    users = cursor.fetchall()
    pool.put_cursor(cursor)  # Put the connection object back to the pool
    users = [User(**user) for user in users]
    return users


def add_user(users):
    db = Database()
    query = 'INSERT INTO users (fname, lname, age, ispm) VALUES (%s, %s, %s, %s)'
    users_tuple = [(user['fname'], user['lname'], user['age'], user['ispm']) for user in users]
    status = db.insert_into_table(query, users_tuple)
    return 'success'
