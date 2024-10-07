Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Leticia')
    cy.get('#lastName').type('Mineiro')
    cy.get('#email').type('leticia@example.com')
    cy.get('#open-text-area').type('Test')
    cy.contains('button', 'Enviar').click()
})