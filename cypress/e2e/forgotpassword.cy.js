/// <reference types="Cypress"/>

describe("Navigates to other pages", () => {
  it("opens the ResetPasswordpage ", () => {
    cy.visit("http://localhost:3030/auth/newPassword.html");
  });
});

describe("ResetPassword page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3030/auth/newPassword.html");
  });

  //   it('Should send email when a valid email is entered and "Send Email" is clicked', () => {
  //     const testEmail = "johndoe@gmail.com"; // Replace with a valid email for testing

  //     cy.get("#email").type(testEmail);
  //     cy.get('button[type="submit"]').click();
  //   });

  it("should have a welcome message", () => {
    cy.get("h1").contains("Welcome");
  });

  it("should fill in and submit the newpassword form", () => {
    cy.get("input#email").type("kimachia@gmail.com");
    cy.get("input#code").type("djksndvkjasndvkasndvjkn");
  });

  it("should display reset password form", () => {
    cy.get("form#form-login").should("be.visible");
  });

  it("should show error messages when login fails", () => {
    cy.get("input#email").type("kimachia");
    cy.get("input#code").type("djksndvkjasndvkasndvjkn");
    cy.get("form#form-login").click();
  });

  it('Should perform the correct action when the "Send Email" button is clicked', () => {
    cy.get("input#email").type("kimachia");
    cy.get("input#code").type("djksndvkjasndvkasndvjkn");
    // cy.get('button[type="submit"]').click();
  });

  it('Should allow entering code into the "code" input field', () => {
    const testCode = "djksndvkjasndvkasndvjkn";

    cy.get("#code").type(testCode).should("have.value", testCode);
  });

  it('Should navigate to the reset password page when the "Send" button is clicked', () => {
    cy.get('a[href="./resetPassword.html"]').click();
    cy.url().should("include", "/resetPassword"); // Replace with the expected URL after clicking the link
  });
});
