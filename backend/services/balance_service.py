from db import Database
from models.Holding import Holding
from utils import stock_api


def get_total_user_holdings(user_id):
    db = Database()
    cursor = db.get_cursor()
    holdings = []
    try:
        cursor.execute('SELECT a.symbol, name, SUM(CASE WHEN t.tx_type= %s THEN t.quantity'
                       ' WHEN t.tx_type= %s THEN -t.quantity ELSE 0 END) as quantity'
                       ' FROM transactions as t INNER JOIN assets as a ON a.symbol=t.asset_symbol'
                       ' WHERE t.user_id = %s GROUP BY a.symbol order by symbol', ('buy', 'sell', user_id))
        holdings = cursor.fetchall()
        holdings = [Holding(**holding) for holding in holdings]
        holdings = calculate_net_holdings(holdings)
    except Exception as e:
        print(e)
    finally:
        db.put_cursor(cursor)
    return holdings


def get_total_pm_holdings(pm_id):
    db = Database()
    cursor = db.get_cursor()
    holdings = []
    try:
        cursor.execute('SELECT a.symbol, name, SUM(CASE WHEN t.tx_type= %s THEN t.quantity'
                       ' WHEN t.tx_type= %s THEN -t.quantity ELSE 0 END) as quantity'
                       ' FROM transactions as t INNER JOIN assets as a ON a.symbol=t.asset_symbol'
                       ' WHERE t.pm_id = %s GROUP BY a.symbol order by symbol', ('buy', 'sell', pm_id))
        holdings = cursor.fetchall()
        holdings = [Holding(**holding) for holding in holdings]
        holdings = calculate_net_holdings(holdings)
    except Exception as e:
        print(e)
    finally:
        db.put_cursor(cursor)
    return holdings


def calculate_net_holdings(total_holdings):
    symbols = [holding.symbol for holding in total_holdings]
    try:
        stocks_data = stock_api.get_stock_prices(symbols)
        for i in range(len(total_holdings)):
            total_holdings[i].value = round(total_holdings[i].quantity * stocks_data[i]['price'], 2)
            total_holdings[i].price = round(stocks_data[i]['price'], 2)
    except Exception as e:
        print(e)
        return []
    return total_holdings


def get_user_invested_value(user_id):
    db = Database()
    cursor = db.get_cursor()
    invested_value = 0
    try:
        cursor.execute('select sum(value) as value from transactions where user_id = %s and tx_type = %s;',
                       (user_id, 'buy'))
        invested_value = cursor.fetchone()
        cursor.execute('select sum(value) as value from transactions where user_id = %s and tx_type = %s;',
                       (user_id, 'sell'))
        sold_value = cursor.fetchone()
        if invested_value and sold_value and invested_value['value'] and sold_value['value']:
            invested_value = invested_value['value'] - sold_value['value']
        else:
            invested_value = 0
    except Exception as e:
        print(e)
    finally:
        db.put_cursor(cursor)
        return round(invested_value, 2)


def get_user_current_value(user_id):
    total_holdings = get_total_user_holdings(user_id)
    return sum([holding.value for holding in total_holdings])


def get_pm_invested_value(pm_id):
    db = Database()
    cursor = db.get_cursor()
    invested_value = 0
    try:
        cursor.execute('select sum(value) as value from transactions where pm_id = %s and tx_type = %s;',
                       (pm_id, 'buy'))
        invested_value = cursor.fetchone()
        cursor.execute('select sum(value) as value from transactions where pm_id = %s and tx_type = %s;',
                       (pm_id, 'sell'))
        sold_value = cursor.fetchone()
        if invested_value and sold_value and invested_value['value'] and sold_value['value']:
            invested_value = invested_value['value'] - sold_value['value']
        else:
            invested_value = 0
    except Exception as e:
        print(e)
    finally:
        db.put_cursor(cursor)
    return round(invested_value, 2)


def get_pm_current_value(pm_id):
    total_holdings = get_total_pm_holdings(pm_id)
    return round(sum([holding.value for holding in total_holdings]), 2)
