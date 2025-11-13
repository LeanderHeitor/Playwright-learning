// @ts-check
const { test, expect } = require("@playwright/test");
const { LandingPage } = require("../pages/LandingPage");
const { Toast } = require("../pages/Components");
const {faker} = require('@faker-js/faker');
let landingPage;
let toast;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  toast = new Toast(page);
});

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await toast.haveText(message);
});

test("Não deve cadastrar quando um email já existe", async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("eitor leander", "eitorleander@hotmail.com");

  const message = "O endereço de e-mail já está registrado em nossa fila de espera.";
  await toast.haveText(message);
});

test("Não deve cadastrar com email incorreto", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("eitor leander", "eitorleander.com.br");

  await landingPage.alertHaveText("Email incorreto");
});

test("Não deve cadastrar quando nome não é preenchido", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("", "eitorleander@gmail.com");

  await landingPage.alertHaveText("Campo obrigatório");

});
test("Não deve cadastrar quando email não é preenchido", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("eitor leander", "");

  await landingPage.alertHaveText("Campo obrigatório");
});

test("Não deve cadastrar quando nenhum campo é preenchido", async ({ page }) => {
  landingPage = new LandingPage(page);
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("", "");

  await landingPage.alertHaveText([
    "Campo obrigatório",
    "Campo obrigatório"
  ]);

});
