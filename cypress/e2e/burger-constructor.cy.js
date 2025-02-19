import { Selector } from '../support/selectors';

describe('Burger constructor', () => {
  beforeEach(() => {
    cy.prepare();
  });

  it('should drag and drop ingredients to the constructor', function () {
    cy.get(Selector.Ingredient).first().as('bun');

    cy.get(Selector.ConstructorDropzone).as('dropzone');

    cy.get('@bun').should('be.visible');

    cy.get('@bun').trigger('dragstart');
    cy.get('@dropzone').trigger('drop');

    cy.get(Selector.Ingredient).eq(1).as('sauce');

    cy.get('@sauce').should('be.visible');

    cy.get('@sauce').trigger('dragstart');
    cy.get('@dropzone').trigger('drop');

    cy.get(Selector.DraggableIngredient).should('exist').and('be.visible');
  });

  it('should open a modal with ingredient details on click and close it', function () {
    cy.get(Selector.Ingredient).first().as('firstIngredient');

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
    cy.get(Selector.Modal).first().within(() => {
      cy.get('[data-testid=ingredient-name]').should('have.text', ingredientName);
      cy.get('[data-testid=ingredient-calories]').should('exist');
      cy.get('[data-testid=ingredient-proteins]').should('exist');
      cy.get('[data-testid=ingredient-fat]').should('exist');
      cy.get('[data-testid=ingredient-carbohydrates]').should('exist');
    });

    // Проверяем закрытие по клику на крестик
    cy.get(Selector.Modal).find(Selector.CloseModalButton).first().click({ force: true });
    cy.get(Selector.Modal).should('not.exist');

    // Проверяем закрытие по клику на оверлей
    cy.get(Selector.Ingredient).first().click();
    cy.get(Selector.Modal).contains('Детали ингредиента').should('exist');
    cy.get(Selector.ModalOverlay).should('exist').first().click({ force: true });
    cy.get(Selector.Modal).should('not.exist');

    // Проверяем закрытие по клавише Escape
    cy.get(Selector.Ingredient).first().click();
    cy.get(Selector.Modal).contains('Детали ингредиента').should('exist');
    cy.get('body').trigger('keydown', { key: 'Escape' });
    cy.get(Selector.Modal).should('not.exist');
  });

  it('should create an order successfully', () => {
    // Проверяем, что пользователь авторизован
    cy.wait('@getUser').its('response.statusCode').should('eq', 200);

    cy.get(Selector.Ingredient).first().as('bun');
    cy.get(Selector.Ingredient).eq(2).as('filling');

    cy.get('@bun').trigger('dragstart');
    cy.get(Selector.ConstructorDropzone).trigger('drop');

    cy.get('@filling').trigger('dragstart');
    cy.get(Selector.ConstructorDropzone).trigger('drop');

    cy.get('button').contains('Оформить заказ').click();

    cy.wait('@createOrder');

    cy.get(Selector.Modal).should('exist');
    cy.get(Selector.OrderNumber).should('exist');
    cy.get(Selector.OrderNumber).should('have.text', '1234');

    cy.get(Selector.CloseModalButton).click();
    cy.get(Selector.Modal).should('not.exist');
  });
});