import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DmaAuthenticationModule } from '@dma-core';
import { DmaLoginHarness } from '@dma-testing/harnesses';

describe('LoginComponent', () => {
    @Component({
        template: `<dma-login></dma-login>`,
    })
    class TestComponent {}

    async function createLoginTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [DmaAuthenticationModule, RouterTestingModule],
            declarations: [TestComponent],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            harness: await harnessLoader.getHarness(DmaLoginHarness),
        };
    }

    it('should disable the submit button by default', async () => {
        const { harness } = await createLoginTestEnvironment();

        expect(await harness.isLoginBtnDisabled()).toBeTrue();
    });

    it('should show required password error', async () => {
        const { harness } = await createLoginTestEnvironment();

        expect(await harness.passwordError()).toEqual('');

        await harness.focusPasswordInput();
        await harness.blurPasswordInput();
        expect(await harness.passwordError()).toEqual('Your password is required in order to login');

        await harness.inputPassword('mysecretpassword');
        expect(await harness.passwordError()).toEqual('');
    });

    it('should show required email error', async () => {
        const { harness } = await createLoginTestEnvironment();

        expect(await harness.emailError()).toEqual('');

        await harness.focusEmailInput();
        await harness.blurEmailInput();
        expect(await harness.emailError()).toEqual('Your email address is required in order to login');

        await harness.inputEmail('my-email@host.com');
        expect(await harness.emailError()).toEqual('');
    });

    it('should show invalid email format error', async () => {
        const { harness } = await createLoginTestEnvironment();

        expect(await harness.emailError()).toEqual('');

        await harness.inputEmail('my-email');
        expect(await harness.emailError()).toEqual('The provided email address has an invalid format');

        await harness.inputEmail('@host.com');
        expect(await harness.emailError()).toEqual('');
    });

    it('should be able to submit', async () => {
        const { harness } = await createLoginTestEnvironment();
        let wasSubmitted = false;

        spyOn(console, 'log').and.callFake(() => (wasSubmitted = true));

        await harness.inputEmail('my-email@host.com');
        await harness.inputPassword('mysecretpassword');
        expect(await harness.isLoginBtnDisabled()).toBeFalse();

        await harness.submit();

        expect(wasSubmitted).toBeTrue();
    });
});
