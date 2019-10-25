// eslint-disable-next-line import/no-unresolved

context('Calculator', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('URL') || 'http://192.168.0.11:3000/');
    });

    describe('repaymentDates function', () => {
        it('empty array - no arguments passed in', () => {
            // https://on.cypress.io/type
            cy.get('.action-email')
                .type('fake@email.com').should('have.value', 'fake@email.com')

            // .type() with special character sequences
                .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
                .type('{del}{selectall}{backspace}')

                // .type() with key modifiers
                .type('{alt}{option}') //these are equivalent
                .type('{ctrl}{control}') //these are equivalent
                .type('{meta}{command}{cmd}') //these are equivalent
                .type('{shift}')

                // Delay each keypress by 0.1 sec
                .type('slow.typing@email.com', { delay: 100 })
                .should('have.value', 'slow.typing@email.com')

            cy.get('.action-disabled')
            // Ignore error checking prior to type
            // like whether the input is visible or disabled
                .type('disabled error checking', { force: true })
                .should('have.value', 'disabled error checking')
        });

    });



    it('.focus() - focus on a DOM element', () => {
        // https://on.cypress.io/focus
        cy.get('.action-focus').focus()
            .should('have.class', 'focus')
            .prev().should('have.attr', 'style', 'color: orange;')
    })

    it('.blur() - blur off a DOM element', () => {
        // https://on.cypress.io/blur
        cy.get('.action-blur').type('About to blur').blur()
            .should('have.class', 'error')
            .prev().should('have.attr', 'style', 'color: red;')
    })

    it('.clear() - clears an input or textarea element', () => {
        // https://on.cypress.io/clear
        cy.get('.action-clear').type('Clear this text')
            .should('have.value', 'Clear this text')
            .clear()
            .should('have.value', '')
    })
});
