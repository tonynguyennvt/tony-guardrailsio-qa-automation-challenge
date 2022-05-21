// ***********************************************
// This command s created for all reuseable code and function
// Author: Tony Nguyen
// Issue date: Sat 21 May, 2022
// ***********************************************


// To verify that the element is visible
Cypress.Commands.add('isVisible', (element) => {
    cy.get(element)
        .should('be.visible');
  })

// To click on the element defined by class name or id name
// {position} is the position to click, leave it if you want to click on the center
Cypress.Commands.add('clickOnElement', (element, position) => {
    cy.get(element)
        .should('be.visible')
        .click(position);
  })

// To click on an element defined by XPath
Cypress.Commands.add('clickOnXpath', (xpath) => {
    cy.xpath(xpath)
        .click();
  })

// To type {text} into an element defined by class name or id name
Cypress.Commands.add('typeOnElement', (element, text) => {
    cy.get(element)
        .should('be.visible')
        .click()
        .type(text);
    })
    
// To type {text} into an element defined by XPath
Cypress.Commands.add('typeOnXpath', (xpath, text) => {
    cy.xpath(xpath)
        .click()
        .type(text);
    })
        
// To verify that the element defined by XPath is contain {text}
Cypress.Commands.add('xpathContainText', (xpath, text) => {
    cy.xpath(xpath)
        .should('contain', text);  
  })

// To verify that the element defined by class name or id name is contain {text}
Cypress.Commands.add('elementContainText', (element, text) => {
    cy.get(element)
        .should('contain', text);  
  })

// To verify the children length of the element defined by class name or id name is {length}
Cypress.Commands.add('elementLengthIs', (element, length) => {
    cy.get(element).children().should('have.length', length);
  })

// To create a new user using the API with {email} and {password}
Cypress.Commands.add('apiCreateNewUser', (email, password) => {
    cy.request(
        { 
            method: 'POST', 
            url: 'https://juice-shop.herokuapp.com/api/Users/', 
            headers: {'Content-Type':'application/json'}, 
            body: {
                "email":email,
                "password":password,
                "passwordRepeat":password,
                "securityQuestion":{
                    "id":7,
                    "question":"Name of your favorite pet?",
                    "createdAt":"2022-05-20T04:42:31.450Z",
                    "updatedAt":"2022-05-20T04:42:31.450Z"
                },
                "securityAnswer":"MIX MIX"
            } 
        }).then((res)=>{ expect(res.status).to.eq(201)});
  })

// To return a random string has length is {string_length}
function getRandomString(string_length) {
    var random_text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < string_length; i++) 
        {
            random_text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    return cy.wrap(random_text);
  }

// To get the random string from getRandomString function
Cypress.Commands.add('getRandomString', getRandomString);

// To return a random number has length is {number_length}
function getRandomNumber(number_length) {
    var random_number = '';
    var possible = '0123456789';
    for (let i = 0; i < number_length; i++) 
        {
            random_number += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    return cy.wrap(random_number);
  }

// To get the random number from getRandomNumber function
Cypress.Commands.add('getRandomNumber', getRandomNumber);