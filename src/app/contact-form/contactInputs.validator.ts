import {AbstractControl, ValidationErrors} from '@angular/forms';

export class InputItemsValidator{
  static isAPhoneNumber(control: AbstractControl): ValidationErrors | null {
    if (isNumber(control.value as string)) {return null; }
    else {return {isNotAPhone: true}; }
  }

  static isAValidBirthDate(control: AbstractControl): ValidationErrors | null {
    if (Date.now() >= (control.value as Date).getTime()) {return null; }
    return {isNotValidBirthDate: true};
  }
}

function isNumber(value: string | number): boolean
{
  return ((value != null) &&
    (value !== '') &&
    !isNaN(Number(value.toString())));
}
