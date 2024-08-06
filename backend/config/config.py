import os

from dotenv import load_dotenv
from flask import Flask

load_dotenv()
app = Flask(__name__)
app.config['DB_URL'] = os.getenv('DB_URL')
app.config['FLASK_ENV'] = os.getenv('FLASK_ENV', False)
app.config['DEBUG'] = os.getenv('DEBUG', '0') == '1'
print('config loaded')
