from flask import request

from config.config import app
from services import user_service


@app.route('/users', methods=['GET', 'POST'])
def user():
    if request.method == 'GET':
        try:
            return user_service.get_users()
        except Exception as e:
            print(e)
            return 'error'
    else:
        try:
            return user_service.add_user(request.json)
        except Exception as e:
            print(e)
            return 'error'
