/// <reference types="Cypress"/>

describe("Navigates to other pages", () => {
  it("opens the Loginpage ", () => {
    cy.visit("http://localhost:3030/auth/login.html");
  });
});

describe("Login page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3030/auth/login.html");
  });

  it("should have a welcome message", () => {
    cy.get("h1").contains("Welcome");
  });

  it("should fill in and submit the login form", () => {
    cy.get("input#email").type("kimachia");
    cy.get("input#passwd").type("pass");
  });

  it("should display login form", () => {
    cy.get("form#form-login").should("be.visible");
  });

  it("should show error messages when login fails", () => {
    cy.get("input#email").type("kimachia");
    cy.get("input#passwd").type("password123");
    cy.get("form#form-login").click();
  });

  it('Should navigate to the forgot password page when the "Forgot Password" link is clicked', () => {
    cy.contains("Forgot Password").click();
    cy.url().should("include", "/newPassword"); 
  });

  it('Should navigate to the register page when the "Do not have account" link is clicked', () => {
    cy.contains("Sign Up").click();
    cy.url().should("include", "/register");
  });
});
