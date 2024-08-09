from db import Database
from models.Holding import Holding
from utils import stock_api


def get_user_holdings(user_id, txn_type):
    db = Database()
    cursor = db.get_cursor()
    cursor.execute('select sum(quantity) as quantity, asset_symbol, sum(value) as value from transactions where'
                   ' user_id = %s and tx_type = %s group by asset_symbol order by asset_symbol;', (user_id, txn_type))
    sale_holdings = cursor.fetchall()
    db.put_cursor(cursor)
    return sale_holdings


def get_total_user_holdings(user_id):
    sale_holdings = [Holding(**holding) for holding in get_user_holdings(user_id, 'sell')]
    buy_holdings = [Holding(**holding) for holding in get_user_holdings(user_id, 'buy')]
    print(sale_holdings, buy_holdings)
    total_holdings = []
    min_idx = min(len(sale_holdings), len(buy_holdings))
    sale_idx = 0
    buy_idx = 0
    while sale_idx < min_idx and buy_idx < min_idx:
        sale = sale_holdings[sale_idx]
        buy = buy_holdings[buy_idx]
        if sale.asset_symbol == buy.asset_symbol:
            total_holdings.append(Holding(asset_symbol=sale.asset_symbol, quantity=buy.quantity - sale.quantity,
                                          value=buy.value - sale.value))
            sale_idx += 1
            buy_idx += 1
        else:
            if buy_idx < len(buy_holdings):
                total_holdings.append(Holding(asset_symbol=buy.asset_symbol, quantity=buy.quantity,
                                              value=buy.value))
                buy_idx += 1
            if sale_idx < len(sale_holdings):
                total_holdings.append(Holding(asset_symbol=sale.asset_symbol, quantity=-sale.quantity,
                                              value=sale.value))
                sale_idx += 1
    while sale_idx < len(sale_holdings):
        sale = sale_holdings[sale_idx]
        total_holdings.append(Holding(asset_symbol=sale.asset_symbol, quantity=-sale.quantity,
                                      value=sale.value))
        sale_idx += 1
    while buy_idx < len(buy_holdings):
        buy = buy_holdings[buy_idx]
        total_holdings.append(Holding(asset_symbol=buy.asset_symbol, quantity=buy.quantity,
                                      value=buy.value))
        buy_idx += 1
    symbols = [holding.asset_symbol for holding in total_holdings]
    stocks_data = stock_api.get_stock_prices(symbols)
    for i in range(len(total_holdings)):
        total_holdings[i].value = total_holdings[i].quantity * stocks_data[i]['price']
    return total_holdings
