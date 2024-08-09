from typing import List
from models.Transaction import Transaction
from db import Database

def get_transactions(user_id: int):
    pool = Database()
    cursor = pool.get_cursor()
    cursor.execute('SELECT * FROM transactions WHERE user_id = %s', (user_id,))
    transaction_data = cursor.fetchone()
    pool.put_cursor(cursor)

    if transaction_data:
        return Transaction(**transaction_data)
    return None

def get_all_transactions():
    pool = Database()
    cursor = pool.get_cursor()
    cursor.execute('SELECT * FROM transactions')
    transactions_data = cursor.fetchall()
    pool.put_cursor(cursor)
    return [Transaction(**tx) for tx in transactions_data]

def add_transaction(transactions):
    db = Database()
    query = 'INSERT INTO transactions (pm_id, user_id, asset_symbol, quantity, price_per_unit, tx_type, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s)'
    transaction_tuple = [(transaction['pm_id'], transaction['user_id'], transaction['asset_symbol'], transaction['quantity'], transaction['price_per_unit'], transaction['tx_type'], transaction['created_at']) for transaction in transactions]
    status = db.insert_into_table(query, transaction_tuple)
    return 'success'
