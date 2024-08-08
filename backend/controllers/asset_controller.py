from flask import request, jsonify
from config.config import app
from services import asset_service

@app.route('/asset', methods=["GET", "POST"])
def asset():
    if request.method == 'POST':
        try:
            data = request.json
            print(data)
            return asset_service.add_assets(data)
        except Exception as e:
            return jsonify(e)
    else:
        try:
            return jsonify(asset_service.get_all_assets())
        except Exception as e:
            return 'error'