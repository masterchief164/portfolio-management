import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app)
app.config['DB_URL'] = os.getenv('DB_URL')
app.config['FLASK_ENV'] = os.getenv('FLASK_ENV', False)
app.config['DEBUG'] = os.getenv('DEBUG', '0') == '1'
app.config['API_KEY'] = os.getenv('API_KEY')
print('config loaded')
