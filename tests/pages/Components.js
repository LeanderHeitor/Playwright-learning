const { expect } = require('../support');
export class Toast  {
    constructor(page) {
        this.page = page;
    }

    async containText(message){
        const toast = this.page.locator(".toast");
        await expect(toast).toContainText(message);
        await expect(toast).not.toBeVisible({timeout: 10000});
    }
}

