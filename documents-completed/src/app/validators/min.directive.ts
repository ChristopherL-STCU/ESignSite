import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[appMin]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinDirective, multi: true }]
})
export class MinDirective implements Validator, OnChanges {
    @Input('appMin') appMin: number;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['appMin'];
        if (change) {
            this.valFn = minValidator(change.currentValue);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}

export function minValidator(appMin): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value;
        return /^\d+$/.test(appMin) && /^\d+$/.test(value) && value >= appMin
            ? null
            : { 'appMin': { value } };
    };
}
