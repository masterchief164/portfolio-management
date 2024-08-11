from flask import request
from config.config import app
from services import watchlist_service


@app.route('/watchlist/<user_id>', methods=['GET', 'POST'])
def watchlist(user_id):
    if request.method == 'GET':
        try:
            return watchlist_service.get_watchlist_items(user_id)
        except Exception as e:
            print(e)
            return 'error'
    elif request.method == 'POST':
        try:
            asset_symbol = request.json['asset_symbol']
            price_per_unit = request.json['price']
            print(asset_symbol, price_per_unit, user_id)
            return watchlist_service.add_watchlist_item(user_id, asset_symbol, price_per_unit)
        except Exception as e:
            print(e)
            return 'error'


@app.route('/watchlist/<user_id>/<asset_symbol>', methods=['DELETE'])
def remove_watchlist_item(user_id, asset_symbol):
    try:
        return watchlist_service.remove_watchlist_item(user_id, asset_symbol)
    except Exception as e:
        print(e)
        return 'error'
