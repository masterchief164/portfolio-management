from flask import request, jsonify
from config.config import app
from services import user_assets_service

@app.route("/user_assets/<user_id>", methods=["GET"])
def user_assets(user_id):
    try:
        return user_assets_service.get_sector_wise_allocation(user_id)
    except Exception as e:
        return "error"