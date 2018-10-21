import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEqualValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EqualValidatorDirective,
    multi: true
  }]
})
export class EqualValidatorDirective implements Validator {
  @Input() appEqualValidator: string;
  validate(c: AbstractControl): { [key: string]: any; } | null {
    const controlToCompare = c.parent.get(this.appEqualValidator)
    if (controlToCompare && controlToCompare.value !== c.value) return { "notEqual": true };
    return  null //{ "notEqual": true }
    //throw new Error('Method not implemented.');
  }

  constructor() { }

}
