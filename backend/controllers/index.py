from config.config import app


@app.route('/')
@app.route('/index')
def hello_world():
    return 'ok'

@app.route('/experiment')
def get_stock_data():
    try:
        return "Hello world"
    except Exception as e:
        return "error"
