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

describe("Service List Filtering", () => {
  beforeEach(() => {
    cy.login("ren@gmail.com", "123456");

    cy.visit("/services");
    cy.intercept("GET", "**/service", { fixture: "services.json" }).as(
      "getServices",
    );
    cy.wait("@getServices");
  });

  it("should display all services initially", () => {
    cy.get('[data-testid="service-card"]', {timeout: 10000}).should("have.length", 8);
  });

  it("should filter services by search term", () => {
    cy.get('input[placeholder="Procurar por serviço"]').type("Fotografia");
    cy.get('[data-testid="service-card"]').should("have.length", 1);
    cy.get('[data-testid="service-card"]').first().contains("Fotografia");
  });
  it('should filter services by category', () => {
    cy.get('[data-testid="category-select"]').parent().click(); // Click on the parent element to open the dropdown
    cy.get('li[data-value="Fotografia"]').click(); // Click on the appropriate menu item
    cy.get('[data-testid="service-card"]').should('have.length', 1);
    cy.get('[data-testid="service-card"]').first().contains('Fotografia');
  });
  it('should filter services by city', () => {
    cy.get('[data-testid="city-select"]').parent().click({ multiple: true }).first().then(() => {
      cy.get('li[data-value="São Paulo"]').click({ force: true }); // Click on the appropriate menu item
      cy.wait(1000); // Wait for the filter to apply
      cy.get('[data-testid="service-card"]').should('have.length', 1);
    });
  });

  it('should filter services by search term, category, and city', () => {
    cy.get('input[placeholder="Procurar por serviço"]').type('Fotografia');
    cy.get('[data-testid="category-select"]').parent().click({ multiple: true }).first().then(() => {
      cy.get('li[data-value="Fotografia"]').click({ force: true }); // Click on the appropriate menu item
      cy.get('[data-testid="city-select"]').parent().click({ multiple: true }).first().then(() => {
        cy.get('li[data-value="Rio de Janeiro"]').click({ force: true }); // Click on the appropriate menu item
        cy.wait(1000); // Wait for the filter to apply
        cy.get('[data-testid="service-card"]', { timeout: 10000 }).should('have.length', 1);
      });
    });
  });
});
