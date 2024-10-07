// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('verify the app title', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('fill the mandatory fields and send the form', function(){
    const longText = 'Test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test.'
    cy.get('#firstName').type('Leticia')
    cy.get('#lastName').type('Mineiro')
    cy.get('#email').type('leticia@example.com')
    cy.get('#open-text-area').type(longText, { delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('displays an error message when submitting the form with an email with invalid formatting', function(){
    cy.get('#firstName').type('Leticia')
    cy.get('#lastName').type('Mineiro')
    cy.get('#email').type('leticia#example.com')
    cy.get('#open-text-area').type('Test')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('phone field remains empty when filled with a non-numeric value', function (){
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })

  it('displays an error message when the phone number becomes mandatory but is not filled in before submitting the form', function(){
    cy.get('#firstName').type('Leticia')
    cy.get('#lastName').type('Mineiro')
    cy.get('#email').type('leticia@example.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Test')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Fill in and clear the first name, last name, email and phone fields', function (){
    cy.get('#firstName')
      .type('Leticia')
      .should('have.value', 'Leticia')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Mineiro')
      .should('have.value', 'Mineiro')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('leticia@example.com')
      .should('have.value', 'leticia@example.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('displays an error message when submitting the form without filling in the required fields', function (){
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('successfully submits the form using a custom command', function (){
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function (){
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function (){
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function (){
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', function (){
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function (){
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', function (){
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', function (){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function (){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function (){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function (){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function (){
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  })

  
})
