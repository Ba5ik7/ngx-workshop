import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
    
export function MatchStringValidator(controlName: string, stringToMatch: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlOne: AbstractControl|null = control.get(controlName);
    const error: boolean = (controlOne && controlOne?.value !== stringToMatch) ?? false;
    let validatorFn = null
    // Keep errors if the control has other validators
    if(error) {
      validatorFn = { matchString: false };
    } else if(controlOne?.errors) {
      validatorFn = controlOne?.errors;
    }

    controlOne?.setErrors(validatorFn);
    return  error ? validatorFn : null;
  };
}
