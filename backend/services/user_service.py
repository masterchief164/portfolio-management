from db import Database
from models.User import User


def get_users():
    pool = Database()
    users = pool.execute_query('SELECT * FROM users')
    users = [User(**user) for user in users]
    return users
