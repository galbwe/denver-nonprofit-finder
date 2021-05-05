import click

from tasks import find_socrata_api_leads


@click.command()
@click.option('--perpage', default=500)
@click.option('--pages', default=5)
def scrape_socrata(perpage, pages):
    for page in range(pages):
        find_socrata_api_leads.delay(perpage, page)
