import requests
import yfinance as yf
import json
# from config.config import app

base_url = 'https://financialmodelingprep.com/api/v3/'
# api_key = app.config['API_KEY']


# def get_stock_prices(symbols):
#     stocks = ','.join(symbols)
#     response = requests.get(base_url + 'quote-short/' + stocks + '?apikey=' + "MllSDpkXJNTNTHgagppB1YgU0EjLUqSN")
#     print(response.json())
#     return response.json()

def get_stock_prices(symbols):
    data = yf.download(symbols, interval="1m", period="1d")
    latest_data = data['Close'].iloc[-1]
    output = [{'symbol': symbol, 'price': round(float(latest_data[symbol]), 2)} for symbol in symbols]
    return output
