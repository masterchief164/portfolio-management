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
            return transaction_service.add_transaction(request.json)
        except Exception as e:
            print(e)
            return request.json


@app.route('/transactions/user/<user_id>', methods=['GET'])
def get_user_transactions(user_id):
    try:
        return transaction_service.get_user_transactions(user_id)
    except Exception as e:
        print(e)
        return 'error'


@app.route('/transactions/pm/<pm_id>', methods=['GET'])
def get_pm_transactions(pm_id):
    try:
        return transaction_service.get_pm_transactions(pm_id)
    except Exception as e:
        print(e)
        return 'error'
