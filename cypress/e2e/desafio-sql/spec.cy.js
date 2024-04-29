// Shows commands
///<reference types="Cypress"/>



describe('Testing SQL', () => {    

  before(()=>{
    cy.login(Cypress.env().user, Cypress.env().pass);
    cy.visit('/');
    
  })


it('Verify product and Create it', () => {

    cy.fixture('./desafio-sql/data.json').then(data =>{
      cy.eliminarProducto(data.product.id);
      cy.crearProducto(data.product);


      //Find the product
      cy.getByDataCy('onlineshoplink').click()
      cy.getByDataCy('search-type').select('ID')
      cy.getByDataCy('search-bar').type(`${data.product.id} {enter}`)

    // Add the product
      //cy.get('[data-cy="add-to-cart-"]').eq(0).click();
      cy.get('[data-cy="add-to-cart-5432"]').click()
      cy.get('[data-cy="closeModal"]').click();
      cy.get('[data-cy="add-to-cart-5432"]').click()
      cy.get('[data-cy="closeModal"]').click();

      //Cart
      cy.getByDataCy('goShoppingCart').click()
      cy.getByDataCy('goBillingSummary').click()
      cy.getByDataCy('goCheckout').click()

      //add details
      cy.getByDataCy('firstName').type('Tomas')
      cy.getByDataCy('lastName').type('Milia')
      cy.getByDataCy('cardNumber').type('1234567891012345')
      cy.getByDataCy('purchase').click()

      //Check DB
      //let sellid;
      cy.getByDataCy('sellId').then( sellId=>{
        
        const query = 'SELECT  id,product, quantity, total_price, price, sell_id FROM public."purchaseProducts" where sell_id =  {sellId}'
        //cy. task("connectDB", query).then()
        cy.task("connectDB", query).then(result => {
          expect(result[0].name).to.equal('Tomas');
          expect(result[0].id).to.equal(data.product.id);
          expect(result[0].lastname).to.equal('Milia');          
      });  
          
      })

    })      

  });

});
/* const query = 'SELECT  id, name, last FROM public.users;'
        cy. task("connectDB", query).then(cy.log)    */   

      