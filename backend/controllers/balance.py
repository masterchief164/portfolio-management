from config.config import app
from services import balance_service


@app.route('/balance')
def balance():
    try:
        return balance_service.get_total_user_holdings(3)
    except Exception as e:
        print("Error", e)
        return 'error'
