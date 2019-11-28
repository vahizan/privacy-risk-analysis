describe('PersonField', () => {
    const selectors = {
        personAccordion: '[data-cy-accordion=person-accordion]',
        submitButton: '[data-cy=new-person-form-submit-button]',
        textarea: '[data-cy=new-person-textarea]',
    };

    context('PersonField', () => {
        const url = Cypress.env('APP_URL') || 'localhost:3000';
        beforeEach(() => {
            cy.visit(url);
        });

        it('.click() - should not change accordion item count without providing input', () => {
            cy.get(selectors.submitButton).click();
            cy.get(selectors.personAccordion).should('have.length', 3);
        });

        it('.click() - should increase accordion item count when valid, space separated input provided', () => {
            cy.get(selectors.textarea).focus().type('RamiroEscobar GB 23    ');
            cy.get(selectors.submitButton).click();
            cy.get(selectors.personAccordion).should('have.length', 3);
        });

        it('.click() - should increase accordion item count when valid, space separated input provided', () => {
            cy.get(selectors.textarea).focus().type('RamiroEscobar GB 23 0.1');
            cy.get(selectors.submitButton).click();
            cy.get(selectors.personAccordion).should('have.length', 4);
        });

        it('.click() - should increase accordion item count when same valid input submitted multiple times', () => {
            cy.get(selectors.textarea).focus().type('RamiroEscobar GB 23 0.1');
            cy.get(selectors.submitButton).click();
            cy.get(selectors.personAccordion).should('have.length', 4);
            cy.get(selectors.submitButton).click();
            cy.get(selectors.personAccordion).should('have.length', 5);
            cy.get(selectors.submitButton).click();
            cy.get(selectors.personAccordion).should('have.length', 6);
        });

        it.only('.click() - should increase accordion item count when different input values submitted consecutively', () => {
            cy.get(selectors.textarea).focus().type('RamiroEscobar GB 23 0.1\n');
            cy.get(selectors.submitButton).click();
            cy.get(selectors.personAccordion).should('have.length', 4);
            cy.get(selectors.textarea).focus().clear().type('Ramiro Escobar GB 23 0.1\n');
            cy.get(selectors.submitButton).click();
            cy.get(selectors.personAccordion).should('have.length', 5);
            cy.get(selectors.textarea).focus().clear().type('ASIAS Escobar asdasd US 39 0.4\n');
            cy.get(selectors.submitButton).click();
            cy.get(selectors.personAccordion).should('have.length', 6);
        });
    });
});
