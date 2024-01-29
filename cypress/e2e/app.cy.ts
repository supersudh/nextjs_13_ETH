const HOSTNAME = Cypress.env('host');

describe('Application', () => {
  it(
    'should navigate to the root page, connect to a wallet and automatically display the transactions data',
    () => {
      console.log('7 here', process.env.TEST_ADDRESS);
      cy.visit(HOSTNAME);
      it("should connect wallet with success", () => {
        cy.get("#connect-btn-MetaMask").click();
        cy.acceptMetamaskAccess();
        cy.get('[data-cy="addressInfo"]').should(
          "have.text",
          process.env.TEST_ADDRESS
        );
      });

      // it("import private key and connect wallet using imported metamask account", () => {
      //   cy.importMetamaskAccount(
      //     process.env.PRIVATE_KEY
      //   );
      //   cy.get("#connect-btn-MetaMask").click();
      //   cy.acceptMetamaskAccess();
      //   cy.get("#accounts").should(
      //     "have.text",
      //     "0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f"
      //   );
      // });
    });
})