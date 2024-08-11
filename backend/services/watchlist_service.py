from db import Database
from models.Watchlist import Watchlist


def get_watchlist_items(user_id):
    db = Database()
    cursor = db.get_cursor()
    items = []
    try:
        cursor.execute(
            'SELECT * FROM watchlist join public.assets a on watchlist.asset_symbol = a.symbol'
            ' join public.users u on watchlist.user_id = u.user_id'
            ' WHERE u.user_id = %s order by symbol', (user_id,))
        items = cursor.fetchall()
        items = [Watchlist(**item) for item in items]
    except Exception as e:
        print(e)
    finally:
        db.put_cursor(cursor)
        return items


def add_watchlist_item(user_id, asset_symbol, price_per_unit):
    db = Database()
    query = 'INSERT INTO watchlist (user_id, asset_symbol, price_per_unit) VALUES (%s, %s, %s)'
    params = [(user_id, asset_symbol, price_per_unit)]
    status = db.insert_into_table(query, params)
    return status


def remove_watchlist_item(user_id, asset_symbol):
    db = Database()
    query = 'DELETE FROM watchlist WHERE user_id = %s AND asset_symbol = %s'
    params = [(user_id, asset_symbol)]
    status = db.insert_into_table(query, params)
    return status
