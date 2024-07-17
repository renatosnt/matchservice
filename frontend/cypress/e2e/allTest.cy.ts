import { faker } from "@faker-js/faker";
import "../support/commands";

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("title", () => {
    cy.get('[data-testid="cypress-title"]').should("exist");
  });

  it("renders the title", () => {
    cy.contains("MatchService").should("be.visible");
  });

  it("renders the background image", () => {
    cy.get('img[alt="Working remotely"]').should("be.visible");
  });

  it("renders the navigation buttons", () => {
    cy.contains("Encontrar Serviços").should("be.visible");
    cy.contains("Entrar").should("be.visible");
    cy.contains("Cadastrar").should("be.visible");
    cy.contains("Oferecer Serviços").should("be.visible");
  });

  it("renders the main content", () => {
    cy.contains("Conecte-se & Cresça").should("be.visible");
    cy.contains(
      "Descubra a maneira mais fácil de agendar serviços locais",
    ).should("be.visible");
  });

  it('navigates to "Encontrar Serviços" page when clicking the button', () => {
    cy.contains("Encontrar Serviços").click();
    cy.url().should("include", "/login");
  });
});

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    // Aqui você pode adicionar stubs ou mocks para simular as chamadas à API loginUser
    cy.login("ren@gmail.com", "123456");
  });

  it("renders the logo and title", () => {
    cy.contains("MatchService").should("be.visible");
    cy.contains("Bem-vindo novamente!").should("be.visible");
  });

  it("shows error message for invalid credentials", () => {
    cy.intercept("POST", "/login", {
      statusCode: 401,
    }).as("loginRequest");

    cy.get('[data-testid="email-input"]').type("invalid@email.com");
    cy.get('[data-testid="password-input"]').type("wrongpassword");
    cy.get('[data-testid="login-button"]').click();

    cy.contains("Wrong username or password.").should("be.visible");
  });

  it("logs in successfully with valid credentials", () => {
    cy.get('[data-testid="email-input"]').type("ren@gmail.com");
    cy.get('[data-testid="password-input"]').type("123456");
    cy.get('[data-testid="login-button"]').click();

    cy.url().should("include", "/services");
  });

  it("displays an error message for API errors", () => {
    cy.intercept("POST", "/login", {
      statusCode: 500,
    }).as("loginRequest");

    cy.get('[data-testid="email-input"]').type("ren@gmail.com");
    cy.get('[data-testid="password-input"]').type("123456");
    cy.get('[data-testid="login-button"]').click();

    cy.contains("Wrong username or password.").should("be.visible");
  });
});

describe("Service List Filtering", () => {
  beforeEach(() => {
    cy.login("ren@gmail.com", "123456");

    cy.visit("/services");
    cy.intercept("GET", "**/service", { fixture: "services.json" }).as(
      "getServices",
    );
  });

  it("should display all services initially", () => {
    cy.get('[data-testid="service-card"]', { timeout: 10000 }).should(
      "have.length.greaterThan",
      0,
    );
  });

  it("should filter services by search term", () => {
    cy.get('input[placeholder="Procurar por serviço"]').type("Fotografia");
    cy.get('[data-testid="service-card"]').should("have.length", 1);
    cy.get('[data-testid="service-card"]').first().contains("Fotografia");
  });
  it("should filter services by category", () => {
    cy.get('[data-testid="category-select"]').parent().click();
    cy.get('li[data-value="Fotografia"]').click();
    cy.get('[data-testid="service-card"]').should("have.length", 1);
    cy.get('[data-testid="service-card"]').first().contains("Fotografia");
  });
  it("should filter services by city", () => {
    cy.get('[data-testid="city-select"]')
      .parent()
      .click({ multiple: true })
      .first()
      .then(() => {
        cy.get('li[data-value="São Paulo"]').click({ force: true });
        cy.wait(1000);
        cy.get('[data-testid="service-card"]').should("have.length", 1);
      });
  });

  it("should filter services by search term, category, and city", () => {
    cy.get('input[placeholder="Procurar por serviço"]').type("Fotografia");
    cy.get('[data-testid="category-select"]')
      .parent()
      .click({ multiple: true })
      .first()
      .then(() => {
        cy.get('li[data-value="Fotografia"]').click({ force: true });
        cy.get('[data-testid="city-select"]')
          .parent()
          .click({ multiple: true })
          .first()
          .then(() => {
            cy.get('li[data-value="Rio de Janeiro"]').click({ force: true });
            cy.wait(1000);
            cy.get('[data-testid="service-card"]', { timeout: 10000 }).should(
              "have.length",
              1,
            );
          });
      });
  });
});

describe("Add a new service Test", () => {
  beforeEach(() => {
    // Log in as a service provider
    cy.visit("/");
    cy.login("tst@gmail.com", "123456");
    cy.saveLocalStorage();
  });

  it("should add a new service", () => {
    cy.visit("/account");

    cy.contains("Novo Serviço").click();

    cy.get('[data-testid="service-title-input"]').type("New Service Title");
    cy.get('[data-testid="service-description-input"]').type(
      "New Service Description",
    );
    cy.get('[data-testid="service-category-select"]').parent().click();
    cy.get('li[data-value="Fotografia"]').click();
    cy.get('[data-testid="service-city-select"]').parent().click();
    cy.get('li[data-value="São Paulo"]').click();
    cy.get('[data-testid="service-price-input"]').type("150");

    cy.contains("button", "Salvar").click();

    cy.get('[role="dialog"]').should("not.exist");
  });

  it("should open the service modal when a service is clicked", () => {
    cy.visit("/services");

    cy.get('[data-testid="service-card"]').first().click();

    cy.get('[data-testid="service-modal"]').should("be.visible");
    cy.get('[data-testid="service-title"]').should("contain.text", ""); // Adjust this line based on your service title
    cy.get('[data-testid="provider-name"]').should("contain.text", ""); // Adjust based on your expected provider name
    cy.get('[data-testid="service-location"]').should("contain.text", "");
    cy.get('[data-testid="service-basePrice"]').should("contain.text", "");
  });

  it("should display and function the Agendar button for a customer", () => {
    cy.visit("/services");

    cy.get('[data-testid="service-card"]').first().click();

    cy.get('[data-testid="confirm-button"]').should("be.visible").click();

    cy.get('[data-testid="confirm-modal"]').should("be.visible");
    cy.get('[data-testid="confirm-modal"]').contains(
      "Deseja agendar este serviço?",
    );

    cy.get('[data-testid="confirm-modal"]').contains("Concluir").click();

    cy.get('[data-testid="confirm-modal"]').should("not.exist");
    cy.get('[data-testid="service-modal"]').should("not.exist");
  });
});

describe("Register Customer Page", () => {
  beforeEach(() => {
    cy.visit("/register");

    // Mocks para as chamadas de API
    cy.intercept("POST", "**/register");
  });

  it("renders the logo and title", () => {
    cy.contains("MatchService").should("be.visible");
    cy.contains("Olá!").should("be.visible");
    cy.contains("Cadastre-se para começar").should("be.visible");
  });

  it("registers a new customer successfully", () => {
    const fullName = faker.name.fullName();
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const telephone = faker.phone.number;

    cy.get('[data-testid="fullName"]').type(fullName);
    cy.get('[data-testid="username"]').type(username);
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="telephoneNumber"]').type(telephone());

    cy.get('[data-testid="type"]').click({ force: true });
    cy.contains("Cliente").click({ force: true });

    cy.get('[data-testid="registerButton"]').click({ force: true });
    cy.wait(2000);

    cy.contains("Registration successful!").should("be.visible");
    cy.visit("/services");

    cy.get('[data-testid="profile-icon"]').click();

    // Clicar na opção "Meu Perfil" no menu dropdown
    cy.contains("Meu Perfil").click();

    // Verificar se a URL atual é a do perfil
    cy.url().should("eq", "http://localhost:3000/profile");
  });
});

describe("Register Service provider Page", () => {
  beforeEach(() => {
    cy.visit("/register");

    // Mocks para as chamadas de API
    cy.intercept("POST", "**/register");
  });

  it("renders the logo and title", () => {
    cy.contains("MatchService").should("be.visible");
    cy.contains("Olá!").should("be.visible");
    cy.contains("Cadastre-se para começar").should("be.visible");
  });

  it("registers a new customer successfully", () => {
    const fullName = faker.name.fullName();
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const telephone = faker.phone.number;

    cy.get('[data-testid="fullName"]').type(fullName);
    cy.get('[data-testid="username"]').type(username);
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="telephoneNumber"]').type(telephone());

    cy.get('[data-testid="type"]').parent().click();

    cy.contains("Prestador de Serviço").click({ force: true });

    cy.get('[data-testid="specialty-field"]').parent().click();

    cy.contains("Limpeza").click({ force: true });

    cy.wait(2000);

    cy.get('[data-testid="registerButton"]').click({ force: true });
    cy.wait(2000);

    cy.contains("Registration successful!").should("be.visible");
    cy.visit("/services");

    cy.get('[data-testid="profile-icon"]').click();

    // Clicar na opção "Meu Perfil" no menu dropdown
    cy.contains("Meu Perfil").click();

    // Verificar se a URL atual é a do perfil
    cy.url().should("eq", "http://localhost:3000/account");
  });
});

describe("Profile Page - Schedule and Review", () => {
  beforeEach(() => {
    // Log in as a service provider
    cy.visit("/");
    cy.login("brunacardoso123@gmail.com", "123456");
    cy.saveLocalStorage();
  });

  it("should find the profile name, open the schedule modal, and click to review", () => {
    cy.visit("/profile");
    // Encontrar o elemento com o nome do perfil
    cy.get('[data-testid="profile-name"]').should("be.visible");

    // Clicar no botão "Minha Agenda"
    cy.get('[data-testid="my-schedule-button"]').click();

    // Verificar se o modal de agendamentos está visível
    cy.get('[data-testid="schedule-modal"]').should("be.visible");

    // Clicar no botão para avaliar um agendamento específico
    // Este passo pode precisar ser ajustado com base na estrutura do seu modal e agendamentos
    cy.get('[data-testid="review-button"]').first().click();

    // Aqui você pode adicionar mais verificações ou ações, como preencher um formulário de avaliação
  });
});
