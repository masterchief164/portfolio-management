from typing import List

from db import Database
from models.Transaction import Transaction


def get_user_transactions(user_id: int):
    pool = Database()
    cursor = pool.get_cursor()
    transactions_data = []
    try:
        cursor.execute('SELECT * FROM transactions join users u on u.user_id = transactions.user_id'
                       ' join assets on transactions.asset_symbol = assets.symbol'
                       ' WHERE u.user_id = %s order by created_at', (user_id,))
        transactions_data = cursor.fetchall()
    except Exception as e:
        print(e)
    finally:
        pool.put_cursor(cursor)
        return [Transaction(**tx) for tx in transactions_data]


def get_pm_transactions(pm_id: int):
    pool = Database()
    cursor = pool.get_cursor()
    transactions_data = []
    try:
        cursor.execute('SELECT * FROM transactions join public.users u on u.user_id = transactions.user_id'
                       ' join assets on transactions.asset_symbol = assets.symbol'
                       ' WHERE pm_id = %s order by created_at', (pm_id,))
        transactions_data = cursor.fetchall()
    except Exception as e:
        print(e)
    finally:
        pool.put_cursor(cursor)
        return [Transaction(**tx) for tx in transactions_data]


def get_all_transactions() -> List[Transaction]:
    pool = Database()
    cursor = pool.get_cursor()
    transactions_data = []
    try:
        cursor.execute('SELECT * FROM transactions join users on transactions.user_id = users.user_id '
                       ' join assets on transactions.asset_symbol = assets.symbol '
                       'order by created_at')
        transactions_data = cursor.fetchall()
    except Exception as e:
        print(e)
    finally:
        pool.put_cursor(cursor)
        return [Transaction(**tx) for tx in transactions_data]


def add_transaction(transactions):
    db = Database()
    query = ('INSERT INTO transactions (pm_id, user_id, asset_symbol, quantity, price_per_unit, tx_type, value)'
             ' VALUES (%s, %s, %s, %s, %s, %s, %s)')
    transaction_tuple = [(transaction['pm_id'], transaction['user_id'], transaction['asset_symbol'],
                          transaction['quantity'], transaction['price_per_unit'], transaction['tx_type'],
                          transaction['price_per_unit'] * transaction['quantity'])
                         for transaction in transactions]
    status = db.insert_into_table(query, transaction_tuple)
    return status
