/// <reference types="Cypress"/>

describe("Navigates to other pages", () => {
  it("opens the Register ", () => {
    cy.visit("http://localhost:3030/auth/register.html");
  });
});

describe("Register page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3030/auth/register.html");
  });

  it("should display register form", () => {
    cy.get("form#form-registration").should("be.visible");
  });

  it("should have a welcome message", () => {
    cy.get("h1").contains("Welcome");
  });

  it("should have a welcome message", () => {
    cy.get("p").contains("Experience the Elegance");
  });

  it("should fill in and submit the login form", () => {
    cy.get("input#username").type("kimachia");
    cy.get("input#email").type("kimachia@gmail.com");
    cy.get("input#passwd").type("pass");
  });

  it("should show error messages when login fails", () => {
    cy.get("input#username").type("kimachia");
    cy.get("input#email").type("kimachia@gmail.com");
    cy.get("input#passwd").type("password123");
    cy.get("form#form-registration").click();
  });

  it('Should navigate to the login page when the "Already have an account" link is clicked', () => {
    cy.contains("Log In").click();
    cy.url().should("include", "/login");
  });
});
