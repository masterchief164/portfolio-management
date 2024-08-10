import yfinance as yf
import pandas as pd
import numpy as np

base_url = 'https://financialmodelingprep.com/api/v3/'

def get_stock_prices(symbols):
    print(len(symbols))
    data = yf.download(symbols, interval="1m", period="1d")
    latest_data = data['Close'].iloc[-1]
    output = None
    if isinstance(latest_data, pd.Series):
        output = [{'symbol': symbol, 'price': round(float(latest_data[symbol]), 2)} for symbol in symbols]  # Multiple tickers case
    elif isinstance(latest_data, (float, np.float64)):
        output = [{'symbol': symbols, 'price': round(float(latest_data), 2)}]  # Single ticker case
    print(len(output))
    return output
