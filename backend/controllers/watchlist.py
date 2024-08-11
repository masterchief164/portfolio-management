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
    else:
        return 'watchlist'
