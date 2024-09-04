describe('Service is available', function() {
  it('should be available on localhost:3000', function() {
    // Проверяем доступность приложения
    cy.visit('http://localhost:3000');
    
    // Ожидаем, что страница должна содержать определенные элементы, например, заголовок
    cy.contains('Соберите бургер').should('be.visible');
  });
});