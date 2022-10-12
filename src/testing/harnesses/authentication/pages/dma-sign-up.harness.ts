import { ComponentHarness, TestElement } from '@angular/cdk/testing';

export class DmaSignUpHarness extends ComponentHarness {
    static hostSelector = 'dma-sign-up';

    private usernameInputLocator = this.locatorFor('input[formControlName=username]');
    private emailInputLocator = this.locatorFor('input[formControlName=email]');
    private passwordInputLocator = this.locatorFor('input[formControlName=password]');
    private errorLocator = this.locatorForAll('span.invalid-feedback');
    private submitBtnLocator = this.locatorFor('button[type=submit]');

    async inputUsername(value: string): Promise<void> {
        await (await this.usernameInputLocator()).sendKeys(value);
    }

    async inputEmail(value: string): Promise<void> {
        await (await this.emailInputLocator()).sendKeys(value);
    }

    async inputPassword(value: string): Promise<void> {
        await (await this.passwordInputLocator()).sendKeys(value);
    }

    async submit(): Promise<void> {
        await (await this.submitBtnLocator()).click();
    }

    async isSignUpDisabled(): Promise<boolean> {
        return await (await this.submitBtnLocator()).getProperty('disabled');
    }

    async getEmailInput(): Promise<TestElement> {
        return await this.emailInputLocator();
    }

    async getUsernameInput(): Promise<TestElement> {
        return await this.usernameInputLocator();
    }

    async getPasswordInput(): Promise<TestElement> {
        return await this.passwordInputLocator();
    }

    /**
     * Returns whether an error message is shown and if the message is provided if that message is rendered.
     * @param index the index for the error message
     * -- 0: username errors
     * -- 1: email errors
     * -- 2: password errors
     * @param message The message that should be rendered, if provided.
     */
    async shouldShowErrorMessage(index: number, message?: string): Promise<boolean> {
        const element = (await this.errorLocator())[index];
        const messageIsShown = (await element.getCssValue('display')) === 'block';

        if (message === undefined) {
            return messageIsShown;
        }
        return messageIsShown && (await element.text()) === message;
    }
}
