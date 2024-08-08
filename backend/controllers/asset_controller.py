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
            return jsonify(asset_service.get_all_assets())
        except Exception as e:
            return 'error'

@app.route('/assets/<sector>', methods=["GET"])
def get_assets_by_sector(sector):
    try:
        return sector
    except Exception as e:
        return "error"

# Select asset_symbol  from transactions as t INNER JOIN assets as a ON a.symbol = t.asset_symbol where user_id = 1 group by asset_symbol