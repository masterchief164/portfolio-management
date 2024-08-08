from config.config import app
from db import Database
from controllers import index, user, watchlist, asset_controller, transaction

if __name__ == '__main__':
    interfaces = "0.0.0.0" if app.config['FLASK_ENV'] else "127.0.0.1"
    pool = Database()
    app.run(host=interfaces, port=8000, debug=app.config['DEBUG'])
