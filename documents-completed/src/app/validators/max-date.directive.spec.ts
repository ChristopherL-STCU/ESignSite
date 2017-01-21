/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import { By } from '@angular/platform-browser';

import { MaxDateDirective } from './max-date.directive';

@Component({
    template: `
    <form>
      <input name="tovalidate" [ngModel]="toValidate" [appMaxDate]="maxDate" />
    </form>
    `
})
class TestComponent {
    maxDate: number;
    toValidate: string;
}

describe('directive: MaxDateDirective', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TestComponent, MaxDateDirective]
        });
    });

    it('should be valid when date is the max', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.maxDate = Date.parse('1/1/2017');
        fixture.detectChanges();
        tick();

        const form = fixture.debugElement.children[0].injector.get(NgForm);
        const input = fixture.debugElement.query(By.css('input'));

        input.nativeElement.value = '1/1/2017';
        dispatchEvent(input.nativeElement, 'input');
        fixture.detectChanges();
        expect(form.valid).toBeTruthy();
    }));

    it('should be valid when max is not specified', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.maxDate = Date.parse('');
        fixture.detectChanges();
        tick();

        const form = fixture.debugElement.children[0].injector.get(NgForm);
        const input = fixture.debugElement.query(By.css('input'));

        input.nativeElement.value = '1/1/2018';
        dispatchEvent(input.nativeElement, 'input');
        fixture.detectChanges();
        expect(form.valid).toBeFalsy();
    }));

    it('should not be valid when date is after max', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.maxDate = Date.parse('1/1/2017');
        fixture.detectChanges();
        tick();

        const form = fixture.debugElement.children[0].injector.get(NgForm);
        const input = fixture.debugElement.query(By.css('input'));

        input.nativeElement.value = '1/1/2018';
        dispatchEvent(input.nativeElement, 'input');
        fixture.detectChanges();
        expect(form.valid).toBeFalsy();
    }));

    it('should not be valid when date is not specified', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.maxDate = Date.parse('1/1/2017');
        fixture.detectChanges();
        tick();

        const form = fixture.debugElement.children[0].injector.get(NgForm);
        const input = fixture.debugElement.query(By.css('input'));

        input.nativeElement.value = '';
        dispatchEvent(input.nativeElement, 'input');
        fixture.detectChanges();
        expect(form.valid).toBeFalsy();
    }));
});
