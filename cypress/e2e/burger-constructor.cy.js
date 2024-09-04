describe('Burger constructor', () => {
  beforeEach(() => {
    cy.prepare();
  });

  it('should drag and drop ingredients to the constructor', function () {
    cy.get('[data-testid=ingredient]').first().as('bun');

    cy.get('[data-testid="constructor-dropzone"]').as('dropzone');

    cy.get('@bun').should('be.visible');

    cy.get('@bun').trigger('dragstart');
    cy.get('@dropzone').trigger('drop');

    cy.get('[data-testid=ingredient]').eq(1).as('sauce');

    cy.get('@sauce').should('be.visible');

    cy.get('@sauce').trigger('dragstart');
    cy.get('@dropzone').trigger('drop');

    cy.get('[data-testid="draggable-ingredient"]').should('exist').and('be.visible');
  });

  it('should open a modal with ingredient details on click and close it', function () {
    cy.get('[data-testid=ingredient]').first().as('firstIngredient');

    let ingredientName;
    let ingredientPrice;

    // Извлекаем название и цену ингредиента и сохраняем его в переменную
    cy.get('@firstIngredient').find('[data-testid=ingredient-name]').invoke('text').then((text) => {
      ingredientName = text;
    });
    cy.get('@firstIngredient').find('[data-testid=ingredient-price]').invoke('text').then((text) => {
      ingredientPrice = text;
    });

    cy.get('@firstIngredient').click();
    // Проверяем, что в модальном окне отображается правильный ингредиент
    cy.get('[data-testid=modal]').first().within(() => {
      cy.get('[data-testid=ingredient-name]').should('have.text', ingredientName);
      cy.get('[data-testid=ingredient-calories]').should('exist');
      cy.get('[data-testid=ingredient-proteins]').should('exist');
      cy.get('[data-testid=ingredient-fat]').should('exist');
      cy.get('[data-testid=ingredient-carbohydrates]').should('exist');
    });

    // Проверяем закрытие по клику на крестик
    cy.get('[data-testid=modal]').find('[data-testid=close-modal-button]').first().click({ force: true });
    cy.get('[data-testid=modal]').should('not.exist');

    // Проверяем закрытие по клику на оверлей
    cy.get('[data-testid=ingredient]').first().click();
    cy.get('[data-testid=modal]').contains('Детали ингредиента').should('exist');
    cy.get('[data-testid=modal-overlay]').should('exist').first().click({ force: true });
    cy.get('[data-testid=modal]').should('not.exist');

    // Проверяем закрытие по клавише Escape
    cy.get('[data-testid=ingredient]').first().click();
    cy.get('[data-testid=modal]').contains('Детали ингредиента').should('exist');
    cy.get('body').trigger('keydown', { key: 'Escape' });
    cy.get('[data-testid=modal]').should('not.exist');
  });

  it('should create an order successfully', () => {
    // Проверяем, что пользователь авторизован
    cy.wait('@getUser').its('response.statusCode').should('eq', 200);

    cy.get('[data-testid=ingredient]').first().as('bun');
    cy.get('[data-testid=ingredient]').eq(2).as('filling');

    cy.get('@bun').trigger('dragstart');
    cy.get('[data-testid=constructor-dropzone]').trigger('drop');

    cy.get('@filling').trigger('dragstart');
    cy.get('[data-testid=constructor-dropzone]').trigger('drop');

    cy.get('button').contains('Оформить заказ').click();

    cy.wait('@createOrder');

    cy.get('[data-testid=modal]').should('exist');
    cy.get('[data-testid=order-number]').should('exist');
    cy.get('[data-testid=order-number]').should('have.text', '1234');

    cy.get('[data-testid=close-modal-button]').click();
    cy.get('[data-testid=modal]').should('not.exist');
  });
});