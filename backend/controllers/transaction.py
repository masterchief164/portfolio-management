from flask import request

from config.config import app
from services import transaction_service

@app.route('/transactions', methods=['GET', 'POST'])
def transactions():
    if request.method == 'GET':
        try:
            return transaction_service.get_all_transactions()
        except Exception as e:
            print(e)
            return 'error'
    else:
        try:
            print(request.json)
            # demoData=[{pm_id: 1, user_id: 1, asset_symbol: 'DEMO', quantity: 10, price_per_unit: 100, tx_type: 'buy', created_at: '2021-09-01 00:00:00'}]
            return transaction_service.add_transaction(request.json)
        except Exception as e:
            print(e)
            return request.json

@app.route('/transactions/<user_id>', methods=['GET'])
def get_user_transactions(user_id):
    try:
        return transaction_service.get_transaction(user_id)
    except Exception as e:
        print(e)
        return 'error'