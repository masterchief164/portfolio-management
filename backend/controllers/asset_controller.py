from flask import request
from config.config import app
from services import asset_service
from models.Asset import Asset

@app.route('/asset', methods=["GET", "POST"])
def asset():
    if request.method == 'POST':
        try:
            data = request.json
            return asset_service.add_asset(data)
        except Exception as e:
            print(e)
            return 'error'
    elif request.method == 'GET':
        try:
            return asset_service.get_all_assets()
        except Exception as e:
            print(e)
            return 'error'
    else:
        return 'wrong route'