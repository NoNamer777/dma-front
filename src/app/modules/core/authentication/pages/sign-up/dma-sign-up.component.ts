import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

type ErrorMessagePerErrorCode = { [errorCode: string]: string };

type ErrorMessagePerControlError = { [controlName: string]: ErrorMessagePerErrorCode };

const errorMessagePerControlError: ErrorMessagePerControlError = {
    username: {
        required: 'A username is required in order to create an account',
    },
    email: {
        required: 'An email address is required in order create an account',
        email: 'Please provide an valid email address format',
    },
    password: {
        required: 'Please provide a password to protect your account',
    },
};

@Component({
    selector: 'dma-sign-up',
    templateUrl: './dma-sign-up.component.html',
    styleUrls: ['./dma-sign-up.component.scss'],
})
export class DmaSignUpComponent {
    state?: 'busy' | 'error' | 'success' = 'error';

    signUpForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    onSubmit(): void {
        console.error('Submitting form', this.signUpForm.value);
    }

    isInvalid(controlName: string): boolean {
        const control = this.getFormControl(controlName);

        return control.invalid && (control.touched || control.dirty);
    }

    isValid(controlName: string): boolean {
        const control = this.getFormControl(controlName);

        return control.valid && control.dirty;
    }

    getErrorMessage(controlName: string): string {
        const errors = Object.keys(this.getFormControl(controlName).errors ?? {});

        if (errors.length === 0) {
            return '';
        }
        return errorMessagePerControlError[controlName][errors[0]] as string;
    }

    private getFormControl(controlName: string): FormControl {
        return (this.signUpForm.controls as { [controlName: string]: FormControl })[controlName];
    }
}
