from config.config import app
from db import Database
from controllers import transaction, balance, asset_controller, user, index, watchlist

if __name__ == '__main__':
    interfaces = "0.0.0.0" if app.config['FLASK_ENV'] else "127.0.0.1"
    pool = Database()
    app.run(host=interfaces, port=8000, debug=app.config['DEBUG'])
