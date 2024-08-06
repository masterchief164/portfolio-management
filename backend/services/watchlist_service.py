from db import Database


def get_watchlist_items(user_id):
    # return Exception('test')
    pool = Database()
    items = pool.execute_query(
        'SELECT * FROM watchlist WHERE user_id = %s', (user_id,))
    return items


def add_watchlist_item(user_id, item_id):
    pool = Database()
    pool.execute_query(
        'INSERT INTO watchlist (user_id, item_id) VALUES (%s, %s)', (user_id, item_id,))
    return 'item added'
