Cypress.Commands.add('prepare', (email, password) => {
  cy.viewport(1920, 1080);
  
  // Мокируем запрос на получение ингредиентов
  cy.intercept({
    method: 'GET',
    url: 'https://norma.nomoreparties.space/api/ingredients'
  }, {
    statusCode: 200,
    fixture: 'ingredients'
  }).as('getIngredients');

  // Мокируем запрос на авторизацию
  cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
    statusCode: 200,
    fixture: 'auth'
  }).as('login');

  // Мокируем запрос на получение данных пользователя
  cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
    statusCode: 200,
    fixture: 'auth'
  }).as('getUser');

  // Мокируем запрос на создание заказа
  cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
    statusCode: 200,
    fixture: 'order'
  }).as('createOrder');

  cy.fixture('auth').then((authData) => {
    window.localStorage.setItem('refreshToken', authData.refreshToken);
    window.localStorage.setItem('accessToken', authData.accessToken);
  });

  cy.visit('http://localhost:3000/');
});

Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'https://norma.nomoreparties.space/api/auth/login',
    body: { email, password },
  }).then((response) => {
    window.localStorage.setItem('refreshToken', response.body.refreshToken);
    window.localStorage.setItem('accessToken', response.body.accessToken);
  });
});

Cypress.Commands.add('createOrder', (ingredients) => {
  cy.request({
    method: 'POST',
    url: 'https://norma.nomoreparties.space/api/orders',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
    },
    body: { ingredients },
  });
});