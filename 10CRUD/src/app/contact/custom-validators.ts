import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Custom validator that rejects names containing "admin" or "test"
 * (case-insensitive). Returns an error object if the name is forbidden,
 * otherwise returns null.
 */
export function forbiddenNameValidator(control: AbstractControl): { [key: string]: any } | null {
  const forbidden = /admin|test/i.test(control.value);
  return forbidden ? { forbiddenName: { value: control.value } } : null;
}


/**
 * Cross-field validator that checks whether the email and confirmEmail fields match.
 */
 export const emailMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.get('email');
    const confirmEmail = control.get('confirmEmail');
    return email && confirmEmail && email.value !== confirmEmail.value
      ? { emailMismatch: true }
      : null;
  };

/*
Why does one use ValidatorFn and one not?
Both validators are essentially doing the same thing—taking an AbstractControl and returning either an error object or null—but they're defined slightly differently for clarity and context.

ValidatorFn Typing (e.g., emailMatchValidator):
When you see a validator defined as a ValidatorFn, like this:

export const emailMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
  // implementation
};

it means we’re explicitly telling TypeScript that this function conforms to Angular’s ValidatorFn interface. This is particularly useful for cross-field validators applied at the group level. It makes the function’s expected signature clear and consistent, and it helps with type-checking.

Implicit Return Type (e.g., forbiddenNameValidator):
In contrast, when you define a validator as:

export function forbiddenNameValidator(control: AbstractControl): { [key: string]: any } | null {
  // implementation
}
you're not explicitly labeling it as a ValidatorFn, but its return type is effectively the same. This style is often used for single-control validators and is more of a personal or team preference. It works just as well, but it doesn't provide the explicit type alias that some developers find helpful for readability and maintainability.

*/