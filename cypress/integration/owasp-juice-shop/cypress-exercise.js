// **********************************************************************************************
// This test is created for the Cypress Exercise
// Question is from: QA Automation Engineer Challenge
// Q1: Login with your user, add 1 item to the basket, click on checkout, add a new address,
//      fill in the address form, click on submit.
// Q2: Exact same flow, but this time, add two items to your basket, click on checkout,
//      add a new address, fill in the address form, click on submit.
// Q3: Click on the search button, search for apple,
//      verify that 2 apple products show up and that banana product doesn't show up
//
// Author: Tony Nguyen
// Issue date: Sat 21 May, 2022
// **********************************************************************************************

describe('Test 1 - Submit 1 item to the basket', () => {
    let _email;
    let _password;

    beforeEach(() => {
        // Create a new random account using API
        // We got the clear all database action from the server
        // So we call this request to make sure our testing account always ready for tetsing 
        cy.getRandomString(15).then((value) => {
            _email = 'e_' + value + '@random.com';
            _password = value

            cy.apiCreateNewUser(_email, _password);
          });

        // Navigate to the juice-shop page
        cy.visit('https://juice-shop.herokuapp.com/');
        cy.isVisible('.logo');

        // Close the welcome dailog
        cy.clickOnElement('.close-dialog');
    })

    it('Add 1 item to the Basket then submit it', () => {

        // Navigate to Login session
        cy.clickOnElement('#navbarAccount');
        cy.clickOnElement('#navbarLoginButton');

        // Login with the test account
        cy.typeOnElement('#email', _email)
        cy.typeOnElement('#password', _password)
        cy.clickOnElement('#loginButton');
        cy.wait(2000);

        // Check that the current Basket has zero item
        cy.xpathContainText('//mat-toolbar-row/button[4]', 'Your Basket0');

        // Add 1 item to the basket
        cy.clickOnXpath('//mat-grid-tile[1]/div/mat-card/div[2]/button');

        // Check that the Basket status has 1 item
        cy.xpathContainText('//mat-toolbar-row/button[4]', 'Your Basket1');

        // Process to Checkout session
        cy.clickOnXpath('//mat-toolbar-row/button[4]');
        cy.clickOnElement('#checkoutButton');

        // Add a new address
        cy.clickOnElement('.btn-new-address');
        cy.elementLengthIs('#address-form', 7);

        cy.typeOnXpath('//*[@id="address-form"]/mat-form-field[1]', 'Viet Nam');
        cy.typeOnXpath('//*[@id="address-form"]/mat-form-field[2]', 'Tony Nguyen');
        cy.getRandomNumber(10).then((value) => {
            let _phone = value;
            cy.typeOnXpath('//*[@id="address-form"]/mat-form-field[3]', _phone);
          });
        cy.typeOnXpath('//*[@id="address-form"]/mat-form-field[4]', '777777');
        cy.typeOnXpath('//*[@id="address-form"]/mat-form-field[5]', 'D1');
        cy.typeOnXpath('//*[@id="address-form"]/mat-form-field[6]', 'Ho Chi Minh');
        cy.typeOnXpath('//*[@id="address-form"]/mat-form-field[7]', '123 Street');

        // Submit the form
        cy.clickOnElement('#submitButton', 'left');

        // See the select address to make sure the address is added successfully
       cy.elementContainText('.btn-next', 'Continue');
    })

    it('Add 2 items to the Basket then submit it', () => {

        // Navigate to Login session
        cy.clickOnElement('#navbarAccount');
        cy.clickOnElement('#navbarLoginButton');

        // Login with the test account
        cy.typeOnElement('#email', _email)
        cy.typeOnElement('#password', _password)
        cy.clickOnElement('#loginButton');
        cy.wait(2000);

        // Check that the current Basket has zero item
        cy.xpathContainText('//mat-toolbar-row/button[4]', 'Your Basket0');

        // Add 2 items to the basket
        cy.clickOnXpath('//mat-grid-tile[1]/div/mat-card/div[2]/button');
        cy.clickOnXpath('//mat-grid-tile[2]/div/mat-card/div[2]/button');

        // Check that the Basket status has 2 items then process to Checkout
        cy.xpathContainText('//mat-toolbar-row/button[4]', 'Your Basket2');


        // Process to Checkout session
        cy.clickOnXpath('//mat-toolbar-row/button[4]');
        cy.clickOnElement('#checkoutButton');

        // Add a new address
        cy.clickOnElement('.btn-new-address');
        cy.elementLengthIs('#address-form', 7);

        cy.typeOnXpath('//*[@id="address-form"]/mat-form-field[1]', 'Viet Nam');
        cy.typeOnXpath('//*[@id="address-form"]/mat-form-field[2]', 'Tony Nguyen');
        cy.getRandomNumber(10).then((value) => {
            let _phone = value;
            cy.typeOnXpath('//*[@id="address-form"]/mat-form-field[3]', _phone);
          });
        cy.typeOnXpath('//*[@id="address-form"]/mat-form-field[4]', '777777');
        cy.typeOnXpath('//*[@id="address-form"]/mat-form-field[5]', 'D1');
        cy.typeOnXpath('//*[@id="address-form"]/mat-form-field[6]', 'Ho Chi Minh');
        cy.typeOnXpath('//*[@id="address-form"]/mat-form-field[7]', '123 Street');

        // Submit the form
        cy.clickOnElement('#submitButton', 'left');

        // See the select address to make sure the address is added successfully
       cy.elementContainText('.btn-next', 'Continue');
    })

    it('Search to Apple product', () => {

        // Navigate to Login session
        cy.clickOnElement('#navbarAccount');
        cy.clickOnElement('#navbarLoginButton');

        // Login with the test account
        cy.typeOnElement('#email', _email)
        cy.typeOnElement('#password', _password)
        cy.clickOnElement('#loginButton');
        cy.wait(2000);
        
        // Click on Search icon then search with 'Apple'
        cy.clickOnElement('#searchQuery');
        cy.wait(1000);
        cy.typeOnElement('#mat-input-0', 'apple{enter}');


        // Check the we have 2 Apple products with
        // And we donot have any Banana product
        cy.get('.mat-grid-list > div').children().should('have.length', 2);
        for (let p = 1; p < 3; p++) 
            {
                cy.get('.mat-grid-list > div > mat-grid-tile:nth-child(' + p + ')')
                .invoke('text')
                .should('contain', 'Apple')
                .should('not.contain', 'Banana');
            }
    })
})