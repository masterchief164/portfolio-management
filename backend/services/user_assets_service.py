from db import Database

def get_sector_wise_allocation(user_id):
    pool = Database()
    cursor = pool.get_cursor()
    params = (user_id,)
    query = 'select sector, sum(ua.price_per_unit * ua.quantity) as total_value from user_assets as ua INNER JOIN assets as a ON ua.asset_symbol = a.symbol where user_id = %s group by sector'
    cursor.execute(query, params)
    res = cursor.fetchall()
    pool.put_cursor(cursor)
    return res

