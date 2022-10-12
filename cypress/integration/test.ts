describe('Response tests - successful and unsuccessful', function() {
    beforeEach( function() {
        cy.visit('/')
        cy.fixture('example').then(function (testdata) {
            this.testdata = testdata
        })
    })

    it('Validate successful scenario', function() { 
        cy.intercept({
            method : 'POST',
            url : 'https://api.livechatinc.com/v2/tickets/new'
        },
             { 
                   statusCode : 200,
                   body: [{
                        "id" : "ABCD"}]
             }).as('newUser')
             cy.get('#name').type(this.testdata.name);
             cy.get('#email').type(this.testdata.email);
             cy.get('#subject').type(this.testdata.subject);
             cy.get('#message').type(this.testdata.message);
        cy.get('button').click()
        cy.wait('@newUser')
        cy.get('.success').should('have.text', 'Thank you!')
    })
    it('Validate unsuccessful scenario', function() {
        cy.intercept({
            method : 'POST',
            url : 'https://api.livechatinc.com/v2/tickets/new'
        },
            { 
                 statusCode : 500,
                 body: [{
                    "error" : "Internal server error'"}]
            }).as('newUser')
        cy.get('#name').type(this.testdata.name);
        cy.get('#email').type(this.testdata.wrongemail);
        cy.get('#subject').type(this.testdata.subject);
        cy.get('#message').type(this.testdata.message);
        cy.get('button').click();
        cy.get('.fail').should('have.text', 'Error!');
    })
})

