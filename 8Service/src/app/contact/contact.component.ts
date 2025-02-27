import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { emailMatchValidator, forbiddenNameValidator } from './custom-validators';

import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ReactiveFormsModule } from '@angular/forms';

/*
//can be in separate file
// Custom validator to forbid names that contain the word "admin" or "test" (case-insensitive)
function forbiddenNameValidator(control: AbstractControl): { [key: string]: any } | null {
  const forbidden = /admin|test/i.test(control.value);
  return forbidden ? { forbiddenName: { value: control.value } } : null;
}
*/

@Component({
  selector: 'app-contact',
  standalone: true,
  // If using Angular 17 standalone components, you need to import ReactiveFormsModule.
  // Otherwise, add ReactiveFormsModule in your NgModule.
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Build the form with a FormBuilder, including a FormArray for hobbies.
    this.userForm = this.fb.group({
      name: ['', [Validators.required, forbiddenNameValidator]],
      //email: ['', [Validators.required, Validators.email]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]]
      }, { validators: emailMatchValidator }),
      hobbies: this.fb.array([]) // FormArray to handle dynamic hobby inputs
    });
  }

  // Getter for easy access to the hobbies FormArray in the template.
  get hobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  // Method to add a new hobby control to the FormArray.
  addHobby(): void {
    this.hobbies.push(this.fb.control('', Validators.required));
  }

  // Method called on form submission.
  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
      this.userForm.reset();

    } else {
      console.log('Form is invalid');
    }
  }
}
