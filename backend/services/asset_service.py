from db import Database
from models.Asset import Asset

def add_asset(asset):
    pool = Database()
    sqlQuery = "INSERT INTO assets (symbol, sector, asset_type) values (%s, %s, %s)"
    params = (asset.symbol, asset.sector, asset.type)
    pool.execute_query(sqlQuery, params)
    return 1

def get_all_assets():
    pool = Database()
    assets = pool.execute_query('SELECT * FROM assets')
    assets = [Asset(**asset) for asset in assets]
    return assets