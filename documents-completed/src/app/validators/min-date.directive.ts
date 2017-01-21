import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[appMinDate]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinDateDirective, multi: true }]
})

export class MinDateDirective implements Validator, OnChanges {
    @Input('appMinDate') appMinDate: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['appMinDate'];
        if (change) {
            this.valFn = minDateValidator(change.currentValue);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}

export function minDateValidator(appMinDate): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlDate = control.value === null || control.value === undefined
            ? null
            : Date.parse(control.value);

        return isNaN(appMinDate) || isNaN(controlDate) || controlDate < appMinDate
            ? { 'appMinDate': { controlDate } }
            : null;
    };
}
