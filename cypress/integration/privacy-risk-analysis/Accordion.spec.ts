describe('Accordion', () => {
    const selectors = {
        toggle: '[data-cy=accordion-toggle]',
        content: '[data-cy=accordion-content]',
        hideIcon: '[data-cy=accordion-hide]',
        showIcon: '[data-cy=accordion-show]',
    };
    context('Accordion', () => {
        const url = Cypress.env('APP_URL') || 'localhost:3000';
        beforeEach(() => {
            cy.visit(url);
        });

        it('.click() - click to change "+" icon to "-"', () => {
            cy.get(selectors.toggle).first().click();
            cy.get(selectors.toggle).first().find(selectors.hideIcon).should('be.visible');
            cy.get(selectors.toggle).first().find(selectors.showIcon).should('not.be.visible');
        });

        it('.click() - toggle visibility of show and hide icon', () => {
            cy.get(selectors.toggle).first().click();
            cy.get(selectors.toggle).first().find(selectors.hideIcon).should('be.visible');
            cy.get(selectors.toggle).first().find(selectors.showIcon).should('not.be.visible');
            cy.get(selectors.toggle).first().click();
            cy.get(selectors.toggle).first().find(selectors.hideIcon).should('not.be.visible');
            cy.get(selectors.toggle).first().find(selectors.showIcon).should('be.visible');
        });

        it('.click() - toggle visibility of "+" and "-" icons multiple times', () => {
            cy.get('[data-cy=person-accordion-23]').find(selectors.toggle).click();
            cy.get('[data-cy=person-accordion-23]').find(selectors.hideIcon).should('be.visible');
            cy.get('[data-cy=person-accordion-23]').find(selectors.showIcon).should('not.be.visible');
            cy.get('[data-cy=person-accordion-23]').find(selectors.toggle).click();
            cy.get('[data-cy=person-accordion-23]').find(selectors.hideIcon).should('not.be.visible');
            cy.get('[data-cy=person-accordion-23]').find(selectors.showIcon).should('be.visible');
            cy.get('[data-cy=person-accordion-23]').find(selectors.toggle).click();
            cy.get('[data-cy=person-accordion-23]').find(selectors.hideIcon).should('be.visible');
            cy.get('[data-cy=person-accordion-23]').find(selectors.showIcon).should('not.be.visible');
            cy.get('[data-cy=person-accordion-23]').find(selectors.toggle).click();
            cy.get('[data-cy=person-accordion-23]').find(selectors.hideIcon).should('not.be.visible');
            cy.get('[data-cy=person-accordion-23]').find(selectors.showIcon).should('be.visible');
        });

        it('.click() - click to view accordion', () => {
            cy.get(selectors.toggle).first().click();
            cy.get(selectors.content).first().should('be.visible');
        });

        it('.click() - click twice to toggle accordion visibility', () => {
            cy.get(selectors.toggle).first().click();
            cy.get(selectors.content).first().should('be.visible');
            cy.get(selectors.toggle).first().click();
            cy.get(selectors.content).should('not.exist');
        });

        it('.click() - click on one collapsed accordion should collapse others before expanding', () => {
            cy.get('[data-cy=person-accordion-23]').find(selectors.toggle).click();
            cy.get('[data-cy=person-accordion-23]').find(selectors.content).should('be.visible');
            cy.get('[data-cy=person-accordion-24]').find(selectors.toggle).click();
            cy.get('[data-cy=person-accordion-24]').find(selectors.content).should('be.visible');
            cy.get('[data-cy=person-accordion-23]').find(selectors.content).should('not.exist');
        });
    });
});
