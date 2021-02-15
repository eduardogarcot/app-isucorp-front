import {AbstractControl, ValidationErrors} from '@angular/forms';

export class InputItemsValidator{
  static isAPhoneNumber(control: AbstractControl): ValidationErrors | null {
    if (isNumber(control.value as string)) {return null; }
    else {return {isNotAPhone: true}; }
  }

  static isValidBirthDate(control: AbstractControl): ValidationErrors | null {
    if (Date.now() >= new Date((control.value as string)).getTime()) {return null; }
    return {isNotValidBirthDate: true};
  }
}

function isNumber(value: string | number): boolean
{
  return ((value != null) &&
    (value !== '') &&
    !isNaN(Number(value.toString())));
}
