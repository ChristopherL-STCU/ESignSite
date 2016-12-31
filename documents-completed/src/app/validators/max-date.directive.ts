import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[appMaxDate]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MaxDateDirective, multi: true }]
})
export class MaxDateDirective implements Validator, OnChanges {
    @Input('appMaxDate') appMaxDate: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['appMaxDate'];
        if (change) {
            this.valFn = maxDateValidator(Date.parse(change.currentValue.replace(/\u200E/g, ''))); // IE 0 width char string removal
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}

export function maxDateValidator(appMaxDate): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlDate = control.value === null || control.value === undefined
            ? null
            : Date.parse(control.value.replace(/\u200E/g, '')); // IE 0 width char string removal

        return isNaN(appMaxDate) || isNaN(controlDate) || controlDate > appMaxDate
            ? { 'appMaxDate': { controlDate } }
            : null;
    };
}
