from config.config import app
from services import balance_service


@app.route('/balance/user/<user_id>', methods=['GET'])
def user_holdings(user_id):
    try:
        return balance_service.get_total_user_holdings(user_id)
    except Exception as e:
        print("Error", e)
        return 'error'


@app.route('/balance/pm/<pm_id>', methods=['GET'])
def pm_holdings(pm_id):
    try:
        return balance_service.get_total_pm_holdings(pm_id)
    except Exception as e:
        print("Error", e)
        return 'error'


@app.route('/investment/user/<user_id>', methods=['GET'])
def user_invested_value(user_id):
    try:
        return balance_service.get_user_invested_value(user_id)
    except Exception as e:
        print("Error", e)
        return 'error'


@app.route('/valuation/user/<user_id>', methods=['GET'])
def user_current_value(user_id):
    try:
        return balance_service.get_user_current_value(user_id)
    except Exception as e:
        print("Error", e)
        return 'error'


@app.route('/investment/pm/<pm_id>', methods=['GET'])
def pm_invested_value(pm_id):
    try:
        return balance_service.get_pm_invested_value(pm_id)
    except Exception as e:
        print("Error", e)
        return 'error'


@app.route('/valuation/pm/<pm_id>', methods=['GET'])
def pm_current_value(pm_id):
    try:
        return balance_service.get_pm_current_value(pm_id)
    except Exception as e:
        print("Error", e)
        return 'error'
