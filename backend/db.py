import psycopg2.extras
import psycopg2.pool

from config.config import app


class Database:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance

    def _initialize(self):
        # Initialize the database connection here
        # For example, create a connection object
        print('initializing connection pool')
        self.pool = psycopg2.pool.SimpleConnectionPool(
            2, 5, dsn=app.config['DB_URL'])

    def get_cursor(self):
        conn = self.pool.getconn()
        return conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    def put_cursor(self, cursor):
        cursor.close()
        self.pool.putconn(cursor.connection)

    def insert_into_table(self, query, data):
        conn = self.pool.getconn()
        cursor = conn.cursor()
        cursor.executemany(query, data)
        conn.commit()
        self.pool.putconn(conn)
        return 'success'
