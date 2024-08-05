from config import app


@app.route('/')
@app.route('/index')
def hello_world():
    return 'ok'
