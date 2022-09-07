import { ComponentHarness } from '@angular/cdk/testing';

export class DmaLoginHarness extends ComponentHarness {
    static hostSelector = 'dma-login';

    private loginBtnLocator = this.locatorFor('button.btn.btn-primary[type=submit]');
    private emailInputLocator = this.locatorFor('input[type=email]');
    private passwordInputLocator = this.locatorFor('input[type=password]');
    private errorLocator = this.locatorForAll('p.text-danger');

    async inputEmail(email: string): Promise<void> {
        await (await this.emailInputLocator()).sendKeys(email);
    }

    async focusEmailInput(): Promise<void> {
        await (await this.emailInputLocator()).focus();
    }

    async blurEmailInput(): Promise<void> {
        await (await this.emailInputLocator()).blur();
    }

    async inputPassword(password: string): Promise<void> {
        await (await this.passwordInputLocator()).sendKeys(password);
    }

    async focusPasswordInput(): Promise<void> {
        await (await this.passwordInputLocator()).focus();
    }

    async blurPasswordInput(): Promise<void> {
        await (await this.passwordInputLocator()).blur();
    }

    async submit(): Promise<void> {
        await (await this.loginBtnLocator()).click();
    }

    async emailError(): Promise<string> {
        return await (await this.errorLocator())[0].text();
    }

    async passwordError(): Promise<string> {
        return await (await this.errorLocator())[1].text();
    }

    async formError(): Promise<string> {
        return await (await this.errorLocator())[3].text();
    }

    async isLoginBtnDisabled(): Promise<boolean> {
        return await (await this.loginBtnLocator()).getProperty('disabled');
    }
}
