import sys

from config import app

sys.path.append('backend')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)
