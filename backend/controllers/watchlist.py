from flask import request

from config.config import app
from services import watchlist_service


@app.route('/watchlist', methods=['GET', 'POST'])
def watchlist():
    if request.method == 'GET':
        try:
            return watchlist_service.get_watchlist_items(1)
        except Exception as e:
            print(e)
            return 'error'
    else:
        return 'watchlist'
