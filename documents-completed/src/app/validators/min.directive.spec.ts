/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import { By } from '@angular/platform-browser';

import { MinDirective } from './min.directive';

@Component({
    template: `
    <form>
      <input name="tovalidate" [ngModel]="toValidate" [appMin]="min" />
    </form>
    `
})
class TestComponent {
    min: number;
    toValidate: string;
}

describe('MinDirective', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TestComponent, MinDirective]
        });
    });

    it('should be valid when value is the min', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.min = 1;
        fixture.detectChanges();
        tick();

        const form = fixture.debugElement.children[0].injector.get(NgForm);
        const input = fixture.debugElement.query(By.css('input'));

        input.nativeElement.value = 1;
        dispatchEvent(input.nativeElement, 'input');
        fixture.detectChanges();
        expect(form.valid).toBeTruthy();
    }));

    it('should be valid when min is not specified', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.min = null;
        fixture.detectChanges();
        tick();

        const form = fixture.debugElement.children[0].injector.get(NgForm);
        const input = fixture.debugElement.query(By.css('input'));

        input.nativeElement.value = 1;
        dispatchEvent(input.nativeElement, 'input');
        fixture.detectChanges();
        expect(form.valid).toBeFalsy();
    }));

    it('should not be valid when value is less than min', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.min = 1;
        fixture.detectChanges();
        tick();

        const form = fixture.debugElement.children[0].injector.get(NgForm);
        const input = fixture.debugElement.query(By.css('input'));

        input.nativeElement.value = 0;
        dispatchEvent(input.nativeElement, 'input');
        fixture.detectChanges();
        expect(form.valid).toBeFalsy();
    }));

    it('should not be valid when value is not specified', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.min = 1;
        fixture.detectChanges();
        tick();

        const form = fixture.debugElement.children[0].injector.get(NgForm);
        const input = fixture.debugElement.query(By.css('input'));

        input.nativeElement.value = null;
        dispatchEvent(input.nativeElement, 'input');
        fixture.detectChanges();
        expect(form.valid).toBeFalsy();
    }));
});
