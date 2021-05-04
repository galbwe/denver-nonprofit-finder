import os

from sqlalchemy import create_engine


class DatabaseClient:

    def __init__(self, db, user, host, port, dialect="postgresql"):
        self.db = db
        self.user = user
        self.host = host
        self.port = port
        self.dialect = dialect

    @property
    def connection_string(self):
        return f"{self.dialect}://{self.user}@{self.host}:{self.port}/{self.db}"

    def get_engine(self):
        return create_engine(self.connection_string)

    def get_connection(self):
        return self.get_engine().connect()


def create_database_client():
    try:
        return DatabaseClient(
            os.environ['POSTGRES_DB'],
            os.environ['POSTGRES_USER'],
            os.environ['POSTGRES_HOST'],
            os.environ['POSTGRES_PORT'],
        )
    except KeyError as e:
        raise EnvironmentError("Unset environment variable for postgres client.")


db = create_database_client()
