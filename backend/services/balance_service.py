from db import Database
from models.Holding import Holding
from utils import stock_api


def get_user_holdings(user_id, txn_type):
    db = Database()
    cursor = db.get_cursor()
    cursor.execute('select sum(quantity) as quantity, asset_symbol, sum(value) as value, name from transactions'
                   ' join assets on transactions.asset_symbol = assets.symbol where user_id = %s and tx_type = %s'
                   ' group by asset_symbol, name order by asset_symbol;', (user_id, txn_type))
    sale_holdings = cursor.fetchall()
    db.put_cursor(cursor)
    return sale_holdings


def get_total_user_holdings(user_id):
    sale_holdings = [Holding(**holding) for holding in get_user_holdings(user_id, 'sell')]
    buy_holdings = [Holding(**holding) for holding in get_user_holdings(user_id, 'buy')]
    return calculate_net_holdings(buy_holdings, sale_holdings)


def get_pm_holdings(pm_id, txn_type):
    db = Database()
    cursor = db.get_cursor()
    cursor.execute('select sum(quantity) as quantity, asset_symbol, sum(value) as value, name from transactions'
                   ' join assets on transactions.asset_symbol = assets.symbol where pm_id = %s and tx_type = %s'
                   ' group by asset_symbol, name order by asset_symbol;', (pm_id, txn_type))
    sale_holdings = cursor.fetchall()
    db.put_cursor(cursor)
    return sale_holdings


def get_total_pm_holdings(pm_id):
    sale_holdings = [Holding(**holding) for holding in get_pm_holdings(pm_id, 'sell')]
    buy_holdings = [Holding(**holding) for holding in get_pm_holdings(pm_id, 'buy')]
    return calculate_net_holdings(buy_holdings, sale_holdings)


def calculate_net_holdings(buy_holdings, sale_holdings):
    total_holdings = []
    min_idx = min(len(sale_holdings), len(buy_holdings))
    sale_idx = 0
    buy_idx = 0
    while sale_idx < min_idx and buy_idx < min_idx:
        sale = sale_holdings[sale_idx]
        buy = buy_holdings[buy_idx]
        if sale.asset_symbol == buy.asset_symbol:
            total_holdings.append(Holding(asset_symbol=sale.asset_symbol, quantity=buy.quantity - sale.quantity,
                                          value=buy.value - sale.value, name=sale.name.capitalize()))
            sale_idx += 1
            buy_idx += 1
        else:
            if buy_idx < len(buy_holdings):
                total_holdings.append(Holding(asset_symbol=buy.asset_symbol, quantity=buy.quantity,
                                              value=buy.value, name=buy.name.capitalize()))
                buy_idx += 1
            if sale_idx < len(sale_holdings):
                total_holdings.append(Holding(asset_symbol=sale.asset_symbol, quantity=-sale.quantity,
                                              value=sale.value, name=sale.name.capitalize()))
                sale_idx += 1
    while sale_idx < len(sale_holdings):
        sale = sale_holdings[sale_idx]
        total_holdings.append(Holding(asset_symbol=sale.asset_symbol, quantity=-sale.quantity,
                                      value=sale.value, name=sale.name.capitalize()))
        sale_idx += 1
    while buy_idx < len(buy_holdings):
        buy = buy_holdings[buy_idx]
        total_holdings.append(Holding(asset_symbol=buy.asset_symbol, quantity=buy.quantity,
                                      value=buy.value, name=buy.name.capitalize()))
        buy_idx += 1
    symbols = [holding.asset_symbol for holding in total_holdings]
    stocks_data = stock_api.get_stock_prices(symbols)
    for i in range(len(total_holdings)):
        total_holdings[i].value = total_holdings[i].quantity * stocks_data[i]['price']
        total_holdings[i].price = stocks_data[i]['price']
    return total_holdings


def get_user_invested_value(user_id):
    db = Database()
    cursor = db.get_cursor()
    cursor.execute('select sum(value) as value from transactions where user_id = %s and tx_type = %s;',
                   (user_id, 'buy'))
    invested_value = cursor.fetchone()
    cursor.execute('select sum(value) as value from transactions where user_id = %s and tx_type = %s;',
                   (user_id, 'sell'))
    sold_value = cursor.fetchone()
    if invested_value and sold_value:
        invested_value = invested_value['value'] - sold_value['value']
    else:
        invested_value = 0
    db.put_cursor(cursor)
    return invested_value


def get_user_current_value(user_id):
    total_holdings = get_total_user_holdings(user_id)
    return sum([holding.value for holding in total_holdings])


def get_pm_invested_value(pm_id):
    db = Database()
    cursor = db.get_cursor()
    cursor.execute('select sum(value) as value from transactions where pm_id = %s and tx_type = %s;',
                   (pm_id, 'buy'))
    invested_value = cursor.fetchone()
    cursor.execute('select sum(value) as value from transactions where pm_id = %s and tx_type = %s;',
                   (pm_id, 'sell'))
    sold_value = cursor.fetchone()
    if invested_value and sold_value:
        invested_value = invested_value['value'] - sold_value['value']
    else:
        invested_value = 0
    db.put_cursor(cursor)
    return invested_value


def get_pm_current_value(pm_id):
    total_holdings = get_total_pm_holdings(pm_id)
    return sum([holding.value for holding in total_holdings])
