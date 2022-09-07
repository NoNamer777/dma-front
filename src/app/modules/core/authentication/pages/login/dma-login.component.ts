import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'dma-login',
    templateUrl: './dma-login.component.html',
    styleUrls: ['./dma-login.component.scss'],
})
export class DmaLoginComponent {
    loginForm = new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, [Validators.required]),
    });

    state?: 'busy' | 'error' | 'success';

    onSubmit(): void {
        console.log('Submitting form', this.loginForm.value);
    }

    shouldShowError(controlName: string): string {
        const control = this.getControl(controlName);

        return control.invalid && (control.dirty || control.touched) ? 'visible' : 'invisible';
    }

    controlHasError(controlName: string, error: string): boolean {
        return this.shouldShowError(controlName) == 'visible' && this.getControl(controlName).hasError(error);
    }

    private getControl(controlName: string): FormControl {
        return (this.loginForm.controls as { [controlName: string]: FormControl })[controlName];
    }
}
