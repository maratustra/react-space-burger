Cypress.Commands.add('prepare', (email, password) => {
  cy.viewport(1920, 1080);
  
  // Mock the get-ingredients request
  cy.intercept({
    method: 'GET',
    url: 'https://norma.education-services.ru/api/ingredients'
  }, {
    statusCode: 200,
    fixture: 'ingredients'
  }).as('getIngredients');

  // Mock the login request
  cy.intercept('POST', 'https://norma.education-services.ru/api/auth/login', {
    statusCode: 200,
    fixture: 'auth'
  }).as('login');

  // Mock the get-user request
  cy.intercept('GET', 'https://norma.education-services.ru/api/auth/user', {
    statusCode: 200,
    fixture: 'auth'
  }).as('getUser');

  // Mock the create-order request
  cy.intercept('POST', 'https://norma.education-services.ru/api/orders', {
    statusCode: 200,
    fixture: 'order'
  }).as('createOrder');

  cy.fixture('auth').then((authData) => {
    window.localStorage.setItem('refreshToken', authData.refreshToken);
    window.localStorage.setItem('accessToken', authData.accessToken);
  });

  cy.visit('/');
});

Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'https://norma.education-services.ru/api/auth/login',
    body: { email, password },
  }).then((response) => {
    window.localStorage.setItem('refreshToken', response.body.refreshToken);
    window.localStorage.setItem('accessToken', response.body.accessToken);
  });
});

Cypress.Commands.add('createOrder', (ingredients) => {
  cy.request({
    method: 'POST',
    url: 'https://norma.education-services.ru/api/orders',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
    },
    body: { ingredients },
  });
});