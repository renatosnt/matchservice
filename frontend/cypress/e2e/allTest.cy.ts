import { loginUser } from "../../src/adapters/api/api";
import "../support/commands";
// describe("Home Page", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000/");
//   });

//   it("title", () => {
//     cy.get('[data-testid="cypress-title"]').should("exist");
//   });

//   it("renders the title", () => {
//     cy.contains("MatchService").should("be.visible");
//   });

//   it("renders the background image", () => {
//     cy.get('img[alt="Working remotely"]').should("be.visible");
//   });

//   it("renders the navigation buttons", () => {
//     cy.contains("Encontrar Serviços").should("be.visible");
//     cy.contains("Entrar").should("be.visible");
//     cy.contains("Cadastrar").should("be.visible");
//     cy.contains("Oferecer Serviços").should("be.visible");
//   });

//   it("renders the main content", () => {
//     cy.contains("Conecte-se & Cresça").should("be.visible");
//     cy.contains(
//       "Descubra a maneira mais fácil de agendar serviços locais",
//     ).should("be.visible");
//   });

//   it('navigates to "Encontrar Serviços" page when clicking the button', () => {
//     cy.contains("Encontrar Serviços").click();
//     cy.url().should("include", "/login");
//   });
// });

// describe("Login Page", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000/login");

//     // Aqui você pode adicionar stubs ou mocks para simular as chamadas à API loginUser
//     cy.intercept("POST", "/api/login", {
//       statusCode: 201,
//       body: { token: "mock_token" }, // Simula uma resposta de sucesso da API
//     }).as("loginRequest");
//   });

//   it("renders the logo and title", () => {
//     cy.contains("MatchService").should("be.visible");
//     cy.contains("Bem-vindo novamente!").should("be.visible");
//   });

//   it("shows error message for invalid credentials", () => {
//     cy.intercept("POST", "/api/login", {
//       statusCode: 401,
//     }).as("loginRequest");

//     cy.get('[data-testid="email-input"]').type("invalid@email.com");
//     cy.get('[data-testid="password-input"]').type("wrongpassword");
//     cy.get('[data-testid="login-button"]').click();

//     cy.contains("Wrong username or password.").should("be.visible");
//   });

//   it("logs in successfully with valid credentials", () => {
//     cy.get('[data-testid="email-input"]').type("brunacardoso123@gmail.com");
//     cy.get('[data-testid="password-input"]').type("123456");
//     cy.get('[data-testid="login-button"]').click();

//     cy.url().should("include", "/services");
//   });

//   it("displays an error message for API errors", () => {
//     cy.intercept("POST", "/api/login", {
//       statusCode: 500,
//     }).as("loginRequest");

//     cy.get('[data-testid="email-input"]').type("ren@gmail.com");
//     cy.get('[data-testid="password-input"]').type("123456");
//     cy.get('[data-testid="login-button"]').click();

//     cy.contains("An error occurred. Please try again.").should("be.visible");
//   });
// });

// describe("Service List Filtering", () => {
//   beforeEach(() => {
//     cy.login("ren@gmail.com", "123456");

//     cy.visit("/services");
//     cy.intercept("GET", "**/service", { fixture: "services.json" }).as(
//       "getServices",
//     );
//   });

//   it("should display all services initially", () => {
//     cy.get('[data-testid="service-card"]', { timeout: 10000 }).should(
//       "have.length",
//       8,
//     );
//   });

//   it("should filter services by search term", () => {
//     cy.get('input[placeholder="Procurar por serviço"]').type("Fotografia");
//     cy.get('[data-testid="service-card"]').should("have.length", 1);
//     cy.get('[data-testid="service-card"]').first().contains("Fotografia");
//   });
//   it("should filter services by category", () => {
//     cy.get('[data-testid="category-select"]').parent().click(); 
//     cy.get('li[data-value="Fotografia"]').click(); 
//     cy.get('[data-testid="service-card"]').should("have.length", 1);
//     cy.get('[data-testid="service-card"]').first().contains("Fotografia");
//   });
//   it("should filter services by city", () => {
//     cy.get('[data-testid="city-select"]')
//       .parent()
//       .click({ multiple: true })
//       .first()
//       .then(() => {
//         cy.get('li[data-value="São Paulo"]').click({ force: true }); 
//         cy.wait(1000); 
//         cy.get('[data-testid="service-card"]').should("have.length", 1);
//       });
//   });

//   it("should filter services by search term, category, and city", () => {
//     cy.get('input[placeholder="Procurar por serviço"]').type("Fotografia");
//     cy.get('[data-testid="category-select"]')
//       .parent()
//       .click({ multiple: true })
//       .first()
//       .then(() => {
//         cy.get('li[data-value="Fotografia"]').click({ force: true });
//         cy.get('[data-testid="city-select"]')
//           .parent()
//           .click({ multiple: true })
//           .first()
//           .then(() => {
//             cy.get('li[data-value="Rio de Janeiro"]').click({ force: true });
//             cy.wait(1000); 
//             cy.get('[data-testid="service-card"]', { timeout: 10000 }).should(
//               "have.length",
//               1,
//             );
//           });
//       });
//   });
// });

describe('Add a new service Test', () => {
  beforeEach(() => {
    // Log in as a service provider
    cy.visit('/');
    cy.login('tst@gmail.com', '123456');
  });

  it('should add a new service and verify it in the service list', () => {
    // Navigate to the account page
    cy.visit('/account');

    // Click on the "Novo Serviço" button to open the NewServiceModal
    cy.contains('Novo Serviço').click();

    // Fill in the new service form
    cy.get('[data-testid="service-description-input"]').type('New Service Description');
    cy.get('[data-testid="service-category-select"]').parent().click();
    cy.get('li[data-value="Fotografia"]').click();
    cy.get('[data-testid="service-city-select"]').parent().click();
    cy.get('li[data-value="São Paulo"]').click();
    cy.get('[data-testid="service-price-input"]').type('150');

    // Save the new service
    cy.contains('button', 'Salvar').click();

    // Verify the modal closes
    cy.get('[role="dialog"]').should('not.exist');

    // Navigate to the services page
    cy.visit('/services');

    // Wait for services to load and verify the new service is present
    cy.get('[data-testid="service-card"]').contains('New Service Title').should('be.visible');
  });

  // it('should open the service modal when a service is clicked', () => {
  //   // Navigate to the services page
  //   cy.visit('/services');

  //   // Wait for services to load and click the first service card
  //   cy.get('[data-testid="service-card"]').first().click();

  //   // Check if the modal is visible
  //   cy.get('[data-testid="service-modal"]').should('be.visible');
  //   cy.get('[data-testid="service-title"]').should('contain.text', 'Service Title'); // Adjust this line based on your service title
  //   cy.get('[data-testid="provider-name"]').should('contain.text', 'Provider Name'); // Adjust based on your expected provider name
  //   cy.get('[data-testid="service-location"]').should('contain.text', 'Localização');
  //   cy.get('[data-testid="service-basePrice"]').should('contain.text', 'Preço Base');
  // });

  // it('should display and function the Agendar button for a customer', () => {
  //   // Navigate to the services page
  //   cy.visit('/services');

  //   // Wait for services to load and click the first service card
  //   cy.get('[data-testid="service-card"]').first().click();

  //   // Check if the Agendar button is visible and click it
  //   cy.get('[data-testid="confirm-button"]').should('be.visible').click();

  //   // Confirm the modal
  //   cy.get('[data-testid="confirm-modal"]').should('be.visible');
  //   cy.get('[data-testid="confirm-modal"]').contains('Deseja agendar este serviço?');

  //   // Click the confirm button in the confirmation modal
  //   cy.get('[data-testid="confirm-modal"]').contains('Confirmar').click();

  //   // Check if the confirmation modal closes
  //   cy.get('[data-testid="confirm-modal"]').should('not.exist');
  //   cy.get('[data-testid="service-modal"]').should('not.exist');
  // });

  // it('should close the service modal when the Fechar button is clicked', () => {
  //   // Navigate to the services page
  //   cy.visit('/services');

  //   // Wait for services to load and click the first service card
  //   cy.get('[data-testid="service-card"]').first().click();

  //   // Click the Fechar button
  //   cy.get('[data-testid="close-button"]').click();

  //   // Check if the modal is closed
  //   cy.get('[data-testid="service-modal"]').should('not.exist');
  // });
});



// describe('Service Modal Test', () => {
//   beforeEach(() => {
//     // Set up localStorage with a customer user before each test
//     cy.login("ren@gmail.com", "123456");
//     //tst@gmail.com
    
//     // Visit the services page
//     cy.visit('/services');
//   });

//   it('should open the service modal when a service is clicked', () => {
//     // Wait for services to load
//     cy.get('[data-testid="service-card"]').first().click();

//     // Check if the modal is visible
//     cy.get('[data-testid="service-modal"]').should('be.visible');
//     cy.get('[data-testid="service-title"]').should('contain.text', 'Service Title'); // Adjust this line based on your service title
//     cy.get('[data-testid="provider-name"]').should('contain.text', 'Provider Name'); // Adjust based on your expected provider name
//     cy.get('[data-testid="service-location"]').should('contain.text', 'Localização');
//     cy.get('[data-testid="service-basePrice"]').should('contain.text', 'Preço Base');
//   });

//   it('should display and function the Agendar button for a customer', () => {
//     // Open the modal by clicking a service card
//     cy.get('[data-testid="service-card"]').first().click();
    
//     // Check if the Agendar button is visible and click it
//     cy.get('[data-testid="confirm-button"]').should('be.visible').click();

//     // Confirm the modal
//     cy.get('[data-testid="confirm-modal"]').should('be.visible');
//     cy.get('[data-testid="confirm-modal"]').contains('Deseja agendar este serviço?');
    
//     // Click the confirm button in the confirmation modal
//     cy.get('[data-testid="confirm-modal"]').contains('Confirmar').click();
    
//     // Check if the confirmation modal closes
//     cy.get('[data-testid="confirm-modal"]').should('not.exist');
//     cy.get('[data-testid="service-modal"]').should('not.exist');
//   });

//   it('should close the service modal when the Fechar button is clicked', () => {
//     // Open the modal by clicking a service card
//     cy.get('[data-testid="service-card"]').first().click();
    
//     // Click the Fechar button
//     cy.get('[data-testid="close-button"]').click();
    
//     // Check if the modal is closed
//     cy.get('[data-testid="service-modal"]').should('not.exist');
//   });
// });
