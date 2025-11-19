const {test, expect} = require('../support');
test('deve logar como administrador', async ({page}) => {
    await page.login.visit();
    await page.login.submit("admin@zombieplus.com", "pwd123");
    await page.login.isLoggedIn('Admin');
});

test('não deve logar com senha incorreta', async ({page}) => {
    await page.login.visit();
    await page.login.submit("admin@zombieplus.com", "abc123");

    const message = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";

    await page.toast.containText(message);
});

test('não deve logar quando email é inválido', async ({page}) => {
    await page.login.visit();
    await page.login.submit("www.siteemail.com", "abc123");
    await page.login.alertHaveText("Email incorreto");
});
test('não deve logar quando email não é preenchido', async ({page}) => {
    await page.login.visit();
    await page.login.submit("", "abc123");
    await page.login.alertHaveText("Campo obrigatório");
});
test('não deve logar quando senha não é preenchido', async ({page}) => {
    await page.login.visit();
    await page.login.submit("emailsemsenha@gmail.com", "");
    await page.login.alertHaveText("Campo obrigatório");
});
test('não deve logar quando nenhum campo é preenchido', async ({page}) => {
    await page.login.visit();
    await page.login.submit("", "");
    await page.login.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});
