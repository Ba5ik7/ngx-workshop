import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
    
export function PasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/) ? null : { invalidPassword: true };
  };
}
