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

    // Capture the ingredient name and price into variables
    cy.get('@firstIngredient').find('[data-testid=ingredient-name]').invoke('text').then((text) => {
      ingredientName = text;
    });
    cy.get('@firstIngredient').find('[data-testid=ingredient-price]').invoke('text').then((text) => {
      ingredientPrice = text;
    });

    cy.get('@firstIngredient').click();
    // Modal should show the correct ingredient
    cy.get(Selector.Modal).first().within(() => {
      cy.get('[data-testid=ingredient-name]').should('have.text', ingredientName);
      cy.get('[data-testid=ingredient-calories]').should('exist');
      cy.get('[data-testid=ingredient-proteins]').should('exist');
      cy.get('[data-testid=ingredient-fat]').should('exist');
      cy.get('[data-testid=ingredient-carbohydrates]').should('exist');
    });

    // Close via the close button
    cy.get(Selector.Modal).find(Selector.CloseModalButton).first().click({ force: true });
    cy.get(Selector.Modal).should('not.exist');

    // Close via overlay click
    cy.get(Selector.Ingredient).first().click();
    cy.get(Selector.Modal).contains('Ingredient details').should('exist');
    cy.get(Selector.ModalOverlay).should('exist').first().click({ force: true });
    cy.get(Selector.Modal).should('not.exist');

    // Close via the Escape key
    cy.get(Selector.Ingredient).first().click();
    cy.get(Selector.Modal).contains('Ingredient details').should('exist');
    cy.get('body').trigger('keydown', { key: 'Escape' });
    cy.get(Selector.Modal).should('not.exist');
  });

  it('should create an order successfully', () => {
    // Confirm the user is authorized
    cy.wait('@getUser').its('response.statusCode').should('eq', 200);

    cy.get(Selector.Ingredient).first().as('bun');
    cy.get(Selector.Ingredient).eq(2).as('filling');

    cy.get('@bun').trigger('dragstart');
    cy.get(Selector.ConstructorDropzone).trigger('drop');

    cy.get('@filling').trigger('dragstart');
    cy.get(Selector.ConstructorDropzone).trigger('drop');

    cy.get('button').contains('Place order').click();

    cy.wait('@createOrder');

    cy.get(Selector.Modal).should('exist');
    cy.get(Selector.OrderNumber).should('exist');
    cy.get(Selector.OrderNumber).should('have.text', '1234');

    cy.get(Selector.CloseModalButton).click();
    cy.get(Selector.Modal).should('not.exist');
  });
});