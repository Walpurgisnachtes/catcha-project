import unittest
from sqlalchemy import inspect, text
from sqlalchemy.exc import SQLAlchemyError

from app import engine, Base, SessionLocal  # adjust import as needed


class TestDatabaseConnection(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Ensure tables exist for tests (optional but common).
        # If you rely on Alembic migrations instead, remove this and run migrations in test setup.
        Base.metadata.create_all(bind=engine)

    def test_engine_connection(self):
        """Test if the database engine can establish a connection and run a simple query."""
        try:
            with engine.connect() as conn:
                result = conn.execute(text("SELECT 1")).scalar_one()
                self.assertEqual(result, 1)
        except SQLAlchemyError as e:
            self.fail(f"Database connection failed: {e}")

    def test_session_creation(self):
        """Test if a database session can be created and can execute a simple query."""
        try:
            with SessionLocal() as db:
                result = db.execute(text("SELECT 1")).scalar_one()
                self.assertEqual(result, 1)
        except SQLAlchemyError as e:
            self.fail(f"Session creation or query failed: {e}")

    def test_table_existence(self):
        """Test if the 'users' table exists in the database."""
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        self.assertIn("users", tables, "'users' table should exist in the database")


if __name__ == "__main__":
    unittest.main()