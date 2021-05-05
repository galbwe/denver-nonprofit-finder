A micro-CRM to help Code For Denver discover leads and manage its outreach to potential partners.

# Data Sources For Leads
- [Socrata API](https://data.colorado.gov/Business/Business-Entities-in-Colorado/4ykn-tg5h)
    - Dataset with registered business entities in Colorado. It can be filtered to return only nonprofits.
- Twitter?
- LinkedIn?


# Backend Development Setup (For Unix systems)
1. Run the database, message queue, and celery backend in docker containers: `docker-compose up -d`
1. Change to the `backend` directory.
1. Activate virtual environment: `source venv/bin/activate`
1. Create a development .env file with the following contents:
    ```
    export FLASK_APP=api.app.py
    export POSTGRES_PASSWORD=password
    export POSTGRES_USER=cfd_partner_finder
    export POSTGRES_DB=cfd_partner_finder
    export POSTGRES_HOST=localhost
    export POSTGRES_PORT=5432
    ```
1. Source the .env file: `source .env`
1. Start a Celery worker in a terminal: `celery -A tasks worker --loglevel=INFO`
1. Run the flask api in development mode in another terminal: `flask run`
1. Run the database migrations: from `backend`, run `alembic upgrade head`
1. Run a database population script: from `backend` run `python database/scrape_socrata.py`