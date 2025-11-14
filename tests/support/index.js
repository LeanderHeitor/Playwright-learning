const {test: base, expect} = require('@playwright/test');
const {LandingPage} = require ('../pages/LandingPage');
const { Toast } = require ('../pages/Components');
const { LoginPage } = require ('../pages/LoginPage');
const { MoviesPage } = require ('../pages/moviesPage');
const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            landing: new LandingPage(page),
            toast: new Toast(page),
            login: new LoginPage(page),
            movies: new MoviesPage(page)
        })
    }
})

export { test, expect}