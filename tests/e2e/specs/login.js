describe("Login Test Load", () => {
  it("VIsita la pagina de login", () => {
    cy.visit("http://localhost:8080/login");
    cy.contains("h1", "Ingresa tus datos para acceder");
  });
});

//describe("Login Test Successfull", () => {
 // it("VIsita la pagina de login", () => {
  //  cy.visit("http://localhost:8080/login");
    //cy.get("input[name=Email]").type("admin@admin.cl");
    //cy.get("input[name=Password]").type("123456");
    //cy.get("#login").click();

    //cy.get("h1").should("contain", "Bienvenido al sistema de reservas");
  //});
//});
