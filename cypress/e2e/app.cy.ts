const HOSTNAME = Cypress.env('host');

describe('Application', () => {
  it(
    'should navigate to the root page, connect to a wallet and automatically display the transactions data',
    () => {
      cy.visit(HOSTNAME);
      it("should connect wallet with success", () => {
        cy.get("#connect-btn-MetaMask").click();
        cy.acceptMetamaskAccess();
        cy.get('[data-cy="addressInfo"]').should(
          "have.text",
          process.env.TEST_ADDRESS
        );
      });
    });
})