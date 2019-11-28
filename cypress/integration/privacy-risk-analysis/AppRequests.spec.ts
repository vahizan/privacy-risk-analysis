describe('App', () => {
    const selectors = {
        personAccordion: '[data-cy-accordion=person-accordion]',
    };
    const URL_ENDPOINT = Cypress.env('url') || '';
    const API_KEY = Cypress.env('api_key') || '';

    context('Fetch Requests', () => {
        const url = Cypress.env('APP_URL') || 'localhost:3000';
        let polyfill= '';
        // grab fetch polyfill from remote URL, could be also from a local package
        before(() => {
            const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';
            cy.request(polyfillUrl)
                .then((response) => {
                    polyfill = response.body
                })
        });
        beforeEach(function () {
            // all calls will be done via XHR after we load polyfill
            // so we can spy on them using cy.route
            cy.server();
            cy.fixture('people.json').as('peopleData');
            cy.route({method: 'GET', url: URL_ENDPOINT, delay: 5000, response: '@peopleData', headers: {Accept: 'application/json', 'Content-Type': 'application/json', 'x-api-key': API_KEY }})
                .as('peopleDataResponse');
            // We use cy.visit({onBeforeLoad: ...}) to delete native fetch and load polyfill code instead
            cy.visit(url, {
                onBeforeLoad (win) {
                    delete win.fetch;
                    // since the application code does not ship with a polyfill
                    // load a polyfilled "fetch" from the test
                    // @ts-ignore
                    win.eval(polyfill);
                    // @ts-ignore
                    win.fetch = win.unfetch
                },
            })
        });
        it('should parse fetch response and correctly load the accordion items', () => {
            cy.wait('@peopleDataResponse').then((data) => {
                // @ts-ignore
                cy.get(selectors.personAccordion).should('have.length',data.response.body.people.length);
            });
        });

    });
});
