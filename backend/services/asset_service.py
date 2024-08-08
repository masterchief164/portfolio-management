from db import Database
from models.Asset import Asset


def add_assets(assets):
    db = Database()
    query = "INSERT INTO assets (symbol, sector, asset_type, name) VALUES (%s, %s, %s, %s)"
    assets_tuple = [(asset['symbol'], asset['sector'], asset['type'], asset['name']) for asset in assets]
    status = db.insert_into_table(query, assets_tuple)
    return "success"


def get_all_assets():
    pool = Database()
    cursor = pool.get_cursor()  # Get a connection object
    cursor.execute('SELECT * FROM assets')
    assets = cursor.fetchall()
    # print(assets)
    pool.put_cursor(cursor)  # Put the connection object back to the pool
    assets = [Asset(**asset) for asset in assets]
    return assets

def get_asset_by_sector(sector):
    pool = Database()
    cursor = pool.get_cursor()
    query = 'SELECT * FROM assets WHERE sector = %s'
    params = (sector,)
    cursor.execute(query, params)
    assets = cursor.fetchall()
    pool.put_cursor(cursor)
    assets = [Asset(**asset) for asset in assets]
    return assets
