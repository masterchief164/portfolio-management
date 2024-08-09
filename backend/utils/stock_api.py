import requests

from config.config import app

base_url = 'https://financialmodelingprep.com/api/v3/'
api_key = app.config['API_KEY']


def get_stock_prices(symbols):
    stocks = ','.join(symbols)
    response = requests.get(base_url + 'quote-short/' + stocks + '?apikey=' + api_key)
    return response.json()
