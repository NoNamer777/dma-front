import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DmaAuthenticationModule } from '@dma-core';
import { DmaSignUpHarness } from '@dma-testing/harnesses/authentication/pages/dma-sign-up.harness';

describe('SignUpComponent', () => {
    @Component({
        template: `<dma-sign-up></dma-sign-up>`,
    })
    class TestComponent {}

    async function createSignUpTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaAuthenticationModule, RouterTestingModule],
            declarations: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(DmaSignUpHarness),
        };
    }

    it('should disable the submit button by default', async () => {
        const { harness } = await createSignUpTestEnvironment();

        expect(await harness.isSignUpDisabled()).toBeTrue();
    });

    it('should show required username error', async () => {
        const { harness } = await createSignUpTestEnvironment();
        const usernameInput = await harness.getUsernameInput();

        expect(await harness.shouldShowErrorMessage(0)).toBeFalse();

        await usernameInput.focus();
        await usernameInput.blur();
        expect(
            await harness.shouldShowErrorMessage(0, 'A username is required in order to create an account'),
        ).toBeTrue();

        await usernameInput.sendKeys('player');
        expect(await harness.shouldShowErrorMessage(0)).toBeFalse();
    });

    it('should show required email error', async () => {
        const { harness } = await createSignUpTestEnvironment();
        const emailInput = await harness.getEmailInput();

        expect(await harness.shouldShowErrorMessage(1)).toBeFalse();

        await emailInput.focus();
        await emailInput.blur();
        expect(
            await harness.shouldShowErrorMessage(1, 'An email address is required in order create an account'),
        ).toBeTrue();

        await emailInput.sendKeys('my-address@host.com');
        expect(await harness.shouldShowErrorMessage(1)).toBeFalse();
    });

    it('should show invalid email format error', async () => {
        const { harness } = await createSignUpTestEnvironment();
        const emailInput = await harness.getEmailInput();

        expect(await harness.shouldShowErrorMessage(1)).toBeFalse();

        await emailInput.sendKeys('my-address');
        expect(await harness.shouldShowErrorMessage(1, 'Please provide an valid email address format')).toBeTrue();

        await emailInput.sendKeys('@host.com');
        expect(await harness.shouldShowErrorMessage(1)).toBeFalse();
    });

    it('should show required password error', async () => {
        const { harness } = await createSignUpTestEnvironment();
        const passwordInput = await harness.getPasswordInput();

        expect(await harness.shouldShowErrorMessage(2)).toBeFalse();

        await passwordInput.focus();
        await passwordInput.blur();
        expect(await harness.shouldShowErrorMessage(2, 'Please provide a password to protect your account')).toBeTrue();

        await passwordInput.sendKeys('mysecretpassword');
        expect(await harness.shouldShowErrorMessage(2)).toBeFalse();
    });

    it('should be able to submit', async () => {
        const { harness } = await createSignUpTestEnvironment();
        let wasSubmitted = false;

        spyOn(console, 'error').and.callFake(() => (wasSubmitted = true));

        await harness.inputUsername('player');
        await harness.inputEmail('my-email@host.com');
        await harness.inputPassword('mysecretpassword');
        expect(await harness.isSignUpDisabled()).toBeFalse();

        await harness.submit();

        expect(wasSubmitted).toBeTrue();
    });
});
