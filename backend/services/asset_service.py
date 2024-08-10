from db import Database
from psycopg2.extensions import AsIs
from models.Asset import Asset
from utils.stock_api import get_stock_prices


def add_assets(assets):
    db = Database()
    query = "INSERT INTO assets (symbol, sector, asset_type, name) VALUES (%s, %s, %s, %s)"
    assets_tuple = [(asset['symbol'], asset['sector'], asset['type'], asset['name']) for asset in assets]
    status = db.insert_into_table(query, assets_tuple)
    return "success"


def get_all_assets():
    pool = Database()
    cursor = pool.get_cursor()  # Get a connection object
    cursor.execute('SELECT * FROM assets order by name')
    assets = cursor.fetchall()
    pool.put_cursor(cursor)  # Put the connection object back to the pool
    symbols = [asset['symbol'] for asset in assets]
    complete_assets = []
    prices = get_stock_prices(symbols)
    for i in range(len(assets)):
        asset = Asset(**assets[i])
        asset.price = prices[i]['price']
        asset.name = asset.name.capitalize()
        complete_assets.append(asset)
    return complete_assets


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


def get_asset_by_name(name):
    pool = Database()
    cursor = pool.get_cursor()
    query = 'SELECT * FROM assets WHERE name = %s'
    params = (name,)
    cursor.execute(query, params)
    assets = cursor.fetchall()
    pool.put_cursor(cursor)
    assets = [Asset(**asset) for asset in assets]
    return assets


def get_asset_by_symbol(symbol):
    pool = Database()
    cursor = pool.get_cursor()
    query = 'SELECT * FROM assets WHERE symbol = %s'
    params = (symbol,)
    cursor.execute(query, params)
    assets = cursor.fetchall()
    pool.put_cursor(cursor)
    assets = [Asset(**asset) for asset in assets]
    return assets
