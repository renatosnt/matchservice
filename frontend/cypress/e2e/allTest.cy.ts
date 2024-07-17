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

    cy.contains("An error occurred. Please try again.").should("be.visible");
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
      "have.length",
      8,
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

describe("Register Page", () => {
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
    cy.get('[data-testid="fullName"]').type("John Doe");
    cy.get('[data-testid="username"]').type("johndoe17");
    cy.get('[data-testid="email"]').type("johndoe16@example.com");
    cy.get('[data-testid="password"]').type("password123");
    cy.get('[data-testid="telephoneNumber"]').type("1234567890");

    cy.get('[data-testid="type"]').click({ force: true }); // Força o clique no dropdown
    cy.contains("Cliente").click({ force: true }); // Clica na opção "Cliente"

    cy.get('[data-testid="registerButton"]').click({ force: true }); // Força o clique no botão de registro
    cy.wait(2000);
    // Verifica se a mensagem de sucesso foi exibida (opcional)
    cy.contains("Registration successful!").should("be.visible");
    cy.visit("/services");
  });
});
