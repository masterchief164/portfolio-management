from db import Database
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
    cursor.execute('SELECT * FROM assets order by symbol')
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
    query = 'SELECT * FROM assets WHERE sector = %s order by symbol'
    params = (sector,)
    cursor.execute(query, params)
    assets = cursor.fetchall()
    pool.put_cursor(cursor)
    assets = [Asset(**asset) for asset in assets]
    return assets


def get_asset_by_name(name):
    pool = Database()
    cursor = pool.get_cursor()
    query = 'SELECT * FROM assets WHERE name = %s order by symbol'
    params = (name,)
    cursor.execute(query, params)
    assets = cursor.fetchall()
    pool.put_cursor(cursor)
    assets = [Asset(**asset) for asset in assets]
    return assets


def get_asset_by_symbol(symbol):
    pool = Database()
    cursor = pool.get_cursor()
    query = 'SELECT * FROM assets WHERE symbol = %s sort by symbol'
    params = (symbol,)
    cursor.execute(query, params)
    assets = cursor.fetchall()
    pool.put_cursor(cursor)
    assets = [Asset(**asset) for asset in assets]
    return assets


def get_pm_sector_allocation(pm_id):
    pool = Database()
    cursor = pool.get_cursor()
    query = ('SELECT a.sector, SUM(CASE WHEN t.tx_type= %s THEN t.value WHEN t.tx_type= %s THEN -t.value ELSE 0 END) as'
             ' total_value FROM transactions as t INNER JOIN assets as a ON a.symbol=t.asset_symbol WHERE t.pm_id = %s '
             'GROUP BY a.sector')
    params = ("buy", "sell", pm_id)
    cursor.execute(query, params)
    sector_alloc = cursor.fetchall()
    pool.put_cursor(cursor)
    return calc_percentage_allocation(sector_alloc)


def get_user_sector_allocation(user_id):
    pool = Database()
    cursor = pool.get_cursor()
    query = ('SELECT a.sector, SUM(CASE WHEN t.tx_type= %s THEN t.value WHEN t.tx_type= %s THEN -t.value ELSE 0 END) as'
             ' total_value FROM transactions as t INNER JOIN assets as a ON a.symbol=t.asset_symbol WHERE '
             't.user_id = %s GROUP BY a.sector')
    params = ("buy", "sell", user_id)
    cursor.execute(query, params)
    sector_alloc = cursor.fetchall()
    pool.put_cursor(cursor)
    return calc_percentage_allocation(sector_alloc)


def calc_percentage_allocation(sector_alloc):
    total_value_all_sectors = sum(float(item["total_value"]) for item in sector_alloc)
    percentage_alloc = [
        {
            "sector": item["sector"],
            "perc_alloc": round((float(item["total_value"]) / total_value_all_sectors) * 100, 2)
        }
        for item in sector_alloc
    ]
    return percentage_alloc

