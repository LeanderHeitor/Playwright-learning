const { test, expect } = require('../support');
const {faker} = require('@faker-js/faker');

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(leadName, leadEmail);

  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await page.toast.containText(message);
});

test("Não deve cadastrar quando um email já existe", async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  });

  expect(newLead.ok()).toBeTruthy();
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(leadName, leadEmail);

  const message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera.";
  await page.toast.containText(message, { timeout: 15000 });
});

test("Não deve cadastrar com email incorreto", async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm("eitor leander", "eitorleander.com.br");

  await page.leads.alertHaveText("Email incorreto");
});

test("Não deve cadastrar quando nome não é preenchido", async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm("", "eitorleander@gmail.com");

  await page.leads.alertHaveText("Campo obrigatório");

});
test("Não deve cadastrar quando email não é preenchido", async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm("eitor leander", "");

  await page.leads.alertHaveText("Campo obrigatório");
});

test("Não deve cadastrar quando nenhum campo é preenchido", async ({ page }) => {
  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm("", "");

  await page.leads.alertHaveText([
    "Campo obrigatório",
    "Campo obrigatório"
  ]);

});
