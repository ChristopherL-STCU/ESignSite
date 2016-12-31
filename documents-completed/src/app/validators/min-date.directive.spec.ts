/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import { By } from '@angular/platform-browser';

import { MinDateDirective } from './min-date.directive';

@Component({
    template: `
    <form>
      <input name="tovalidate" [ngModel]="toValidate" [appMinDate]="minDate" />
    </form>
    `
})
class TestComponent {
    minDate: string;
    toValidate: string;
}

describe('component: TestComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TestComponent, MinDateDirective]
        });
    });

    it('should be valid when date is the min', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.minDate = '1/1/2017';
        fixture.detectChanges();
        tick();

        const form = fixture.debugElement.children[0].injector.get(NgForm);
        const input = fixture.debugElement.query(By.css('input'));

        input.nativeElement.value = '1/1/2017';
        dispatchEvent(input.nativeElement, 'input');
        fixture.detectChanges();
        expect(form.valid).toBeTruthy();
    }));

    it('should be valid when min is not specified', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.minDate = '';
        fixture.detectChanges();
        tick();

        const form = fixture.debugElement.children[0].injector.get(NgForm);
        const input = fixture.debugElement.query(By.css('input'));

        input.nativeElement.value = '1/1/2018';
        dispatchEvent(input.nativeElement, 'input');
        fixture.detectChanges();
        expect(form.valid).toBeFalsy();
    }));

    it('should not be valid when date is before min', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.minDate = '1/1/2017';
        fixture.detectChanges();
        tick();

        const form = fixture.debugElement.children[0].injector.get(NgForm);
        const input = fixture.debugElement.query(By.css('input'));

        input.nativeElement.value = '1/1/2016';
        dispatchEvent(input.nativeElement, 'input');
        fixture.detectChanges();
        expect(form.valid).toBeFalsy();
    }));

    it('should not be valid when date is not specified', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.minDate = '1/1/2017';
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
