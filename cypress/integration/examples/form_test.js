describe('This is our first test', () => {
    it('should return true', () => {
       expect(true).to.equal(true) 
    })
})

describe('Testing our form inputs', () => {
    beforeEach(function() { // runs before each test in this block
        cy.visit('http://localhost:3000/')
        // arrange (get our objects we want to test. use the aiming tool to select elements and copy their path.)
    })
    it('Input name into the name input', () => {
       //Act - mimic user interaction
       cy.get('input[name="name"]')
       .type('eric rice') // types the string eric rice into the given selected object.
       //Assert - test / verify
       .should('have.value', 'eric rice') //searches for string on our page 
       cy.get('[for="email"] > b')
       .type('testemail@gmail.com')
       cy.get('[for="password"] > input')
       .type('password123')
       cy.get('[type="checkbox"]')
       .check()
       cy.get('form')
       .submit()
       
    })
})

describe('checking for form validation on empty input', () => {
    beforeEach(function() {
      cy.visit('http://localhost:3000/')
    })
    it('blank email field and form submission', () => {
        cy.get('[for="email"] > b')
       .type(' ')
       cy.get('form')
       .submit()
    })
})