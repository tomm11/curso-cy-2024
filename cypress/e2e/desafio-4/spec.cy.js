// Shows commands
///<reference types="Cypress"/>



describe('Testing SQL', () => {    

  before(()=>{
    cy.login(Cypress.env().user, Cypress.env().pass);
    cy.visit('/');
    
  })


it('Verify product and Create it', () => {

    cy.fixture('./desafio-4/data.json').then(data =>{
      cy.eliminarProducto(data.product1.id);
      cy.eliminarProducto(data.product2.id);
      cy.crearProducto(data.product1);
      cy.crearProducto(data.product2);

      //Find the 1° product and Add it twice
      cy.getByDataCy('onlineshoplink').click()
      cy.getByDataCy('search-type').select('ID')
      cy.getByDataCy('search-bar').type(`${data.product1.id} {enter}`)   
      
      cy.get('[data-cy="add-to-cart-5432"]').click()
      cy.get('[data-cy="closeModal"]').click();
      cy.get('[data-cy="add-to-cart-5432"]').click()
      cy.get('[data-cy="closeModal"]').click();

      //Find the 2° product and Add it twice
      cy.getByDataCy('search-type').select('ID')
      cy.getByDataCy('search-bar').clear().type(`${data.product2.id} {enter}`)   
      
      cy.get('[data-cy="add-to-cart-2345"]').click()
      cy.get('[data-cy="closeModal"]').click();
      cy.get('[data-cy="add-to-cart-2345"]').click()
      cy.get('[data-cy="closeModal"]').click();

      //Verification on Cart
      
      cy.getByDataCy('goShoppingCart').click()
      cy.get(':nth-child(2) > .css-1bhbsny > [data-cy="productName"]').should('have.text', data.product1.name)
      cy.get(':nth-child(3) > .css-1bhbsny > [data-cy="productName"]').should('have.text',data.product2.name)
      const totalprod1 = data.product1.price *2
      const totalprod2 = data.product2.price *2
      const totalSum = totalprod1 + totalprod2
      cy.get('.css-n1d5pa > .chakra-button').click()
      cy.get('#price > b').invoke('text').then ((data)=>{
          const total = parseFloat(data)
          expect(total).to.eq(totalSum);
          cy.log ('Verificacion exitosa')                          
        })
      
      //Verification in Billin Summary and make the purchase
      cy.getByDataCy('goBillingSummary').click()
      cy.get('[data-cy="totalPriceAmount"]').invoke('text').then((data)=>{        
        const val = data.replace('$', '')
        const billingAmount = parseFloat(val)
        expect(billingAmount).to.eq(totalSum)
      })
      cy.getByDataCy('goCheckout').click()    
      cy.getByDataCy('firstName').type('Tomas')
      cy.getByDataCy('lastName').type('Milia')
      cy.getByDataCy('cardNumber').type('1234567891012345')
      cy.getByDataCy('purchase').click()

      //Check DB
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
  

      