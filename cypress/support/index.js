// ***********************************************************
// This support/index.js is processed and
// loaded automatically before your test files.
//
// This is a place to put global configuration and
// behavior that modifies Cypress.
//
// Author: Tony Nguyen
// Issue date: Sat 21 May, 2022
// ***********************************************************

// import
import './commands';

//require
require('cypress-xpath');
// config the timeout is 15000 milisecond
Cypress.config('defaultCommandTimeout', 15000);
