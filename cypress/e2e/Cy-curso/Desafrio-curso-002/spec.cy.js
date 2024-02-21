// Shows commands
///<reference types="Cypress"/>

const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {

    it('basic test', () => {
      cy.visit('https://google.com')
      cy.get('.lnXdpd').should('exist').then( a =>{
        cy.log("entre")
      })     
      
      
        
    });
});
