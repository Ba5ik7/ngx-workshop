import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
    
export function MatchPasswordValidator(controlName: string, toMatchControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlOne: AbstractControl|null = control.get(controlName);
    const controlTwo: AbstractControl|null = control.get(toMatchControlName);
    const error: boolean = (controlOne && controlTwo && controlOne?.value !== controlTwo?.value) ?? false;
    let validatorFn = null
    // Keep errors if the control has other validators
    if(error) {
      validatorFn = {
        matchPassword: {
          value: {
            controlOne: controlOne?.value,
            controlTwo: controlTwo?.value
          }
        }
      };
    } else if(controlOne?.errors) {
      validatorFn = controlOne?.errors;
    }

    controlOne?.setErrors(validatorFn);
    return  error ? validatorFn : null;
  };
}
