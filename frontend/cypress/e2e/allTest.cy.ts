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
