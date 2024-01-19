import { MESSAGES } from "../../test-utils/constants";

const HOSTNAME = Cypress.env('host');

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit(HOSTNAME);
 
    // The new page should contain an h1 with "GREETING TEXT"
    cy.get('h1').contains(MESSAGES.GREETING);
  });
})