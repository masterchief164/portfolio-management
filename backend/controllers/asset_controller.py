from flask import request, jsonify
from config.config import app
from services import asset_service

@app.route('/assets', methods=["GET", "POST"])
def assets():
    if request.method == 'POST':
        try:
            data = request.json
            print(data)
            return asset_service.add_assets(data)
        except Exception as e:
            return "error"
    else:
        try:
            # Get query parameters
            sector = request.args.get('sector')
            name = request.args.get('name')
            symbol = request.args.get('symbol')

            if sector:
                return asset_service.get_asset_by_sector(sector)
            elif name:
                return asset_service.get_asset_by_name(name)
            elif symbol:
                return asset_service.get_asset_by_symbol(symbol)
            else:
                return asset_service.get_all_assets()
        except Exception as e:
            return 'error'

# Select asset_symbol  from transactions as t INNER JOIN assets as a ON a.symbol = t.asset_symbol where user_id = 1 group by asset_symbol