describe('Service is available', function() {
  it('should be available on localhost:3000', function() {
    // App should be reachable
    cy.visit('/');

    // Page should contain a known element (the heading)
    cy.contains('Assemble your burger').should('be.visible');
  });
});