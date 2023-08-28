describe("Navigates to other pages", () => {
  it("opens the Index/landing page ", () => {
    cy.visit("http://localhost:3030");
  });
});

describe("index/landing page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3030");
  });
});
