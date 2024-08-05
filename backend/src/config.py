import os

from dotenv import load_dotenv
from flask import Flask

load_dotenv()
app = Flask(__name__)
app.config['DB_URL'] = os.getenv('DB_URL')
print(app.config['DB_URL'])
print('config loaded')
