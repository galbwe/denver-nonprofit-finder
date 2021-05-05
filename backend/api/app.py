from flask import Flask, request
from sqlalchemy import text

from .db import db


app = Flask(__name__)


@app.route('/healthcheck')
def healthcheck():
    return "healthy", 200


@app.route('/leads', methods=['GET', 'POST'])
def leads_collection_view():
    if request.method == 'GET':
        return _get_all_leads(request)
    elif request.method == 'POST':
        # TODO: implement create method
        return _create_new_lead(request)
    return {
        "message": "Unknown http method",
    }, 404


# TODO: get these from a model
DEFAULT_LEAD_FIELDS = (
    'company_name',
    'company_address',
    'formation_date',
    'contact_name',
    'website',
    'phone',
    'email',
    'twitter',
    'facebook',
    'linkedin',
    'last_email',
    'last_google_search',
    'last_twitter_search',
    'last_facebook_search',
    'last_linkedin_search',
)


MAX_PAGE_SIZE = 1000


def _get_all_leads(request):
    # parse query params
    # TODO: add search parameter
    # TODO: add filters
    try:
        page = int(request.args.get('page', 1))
        if page < 1:
            raise ValueError('Page parameter must be positive.')
        if page > MAX_PAGE_SIZE:
            raise ValueError('Page size exceeded maximum.')
        perpage = int(request.args.get('perpage', 100))
        # removes fields with null values from the response
        drop_null = request.args.get('drop_null', 'false').lower() == 'true'
        include = request.args.get('include')
        if include is None:
            include = list(DEFAULT_LEAD_FIELDS)
        else:
            include = [
                field.lower().strip()
                for field in include.split(',')
                if field.lower() in DEFAULT_LEAD_FIELDS
            ]

    except ValueError as e:
        # TODO: log error message
        return {
            'message': 'invalid query parameters',
            'detail': {
                'error': str(e),
            }
        }, 400
    limit = perpage
    offset = (page - 1) * limit

    # TODO: handle database error
    # just grab all fields for now to avoid exposing query to sql injection
    with db.get_connection() as connection:
        res = connection.execute(
            text("""
                SELECT
                    {columns}
                FROM LEADS
                LIMIT :limit
                OFFSET :offset;
            """.format(
                columns=','.join(DEFAULT_LEAD_FIELDS)
            )),
            limit=limit,
            offset=offset,
        )
        response_body = []
        count = 0
        for row in res:
            # TODO: handle potential errors if the user chooses a field not in the row
            lead = {
                field: getattr(row, field)
                for field in include
            }
            if drop_null:
                lead = {
                    k: v for (k, v) in lead.items() if v is not None
                }
            response_body.append(
                lead
            )
            count += 1
        return {
            'count': count,
            'query': {
                'page': page,
                'perpage': perpage,
            },
            'leads': response_body
        }, 200


def _create_new_lead(request):
    return "create_new_lead"


@app.route('/leads/<int:id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def lead_view():
    # TODO: implement lead_view
    return "lead_view"

