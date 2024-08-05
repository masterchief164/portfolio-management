import psycopg2.pool

from config import app

print('initializing connection pool')
pool = psycopg2.pool.SimpleConnectionPool(
    2, 5, dsn=app.config['DB_URL'])

conn = pool.getconn()
cursor = conn.cursor()
cursor.execute('SELECT * FROM users')
print(cursor.fetchall())
cursor.close()
pool.putconn(conn)
print('connection returned to the pool')
