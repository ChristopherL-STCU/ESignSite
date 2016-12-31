/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import { By } from '@angular/platform-browser';

import { MaxDirective } from './max.directive';

@Component({
    template: `
    <form>
      <input name="tovalidate" [ngModel]="toValidate" [appMax]="max" />
    </form>
    `
})
class TestComponent {
    max: number;
    toValidate: string;
}

describe('MaxDirective', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TestComponent, MaxDirective]
        });
    });

    it('should be valid when value is the max', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.max = 1;
        fixture.detectChanges();
        tick();

        const form = fixture.debugElement.children[0].injector.get(NgForm);
        const input = fixture.debugElement.query(By.css('input'));

        input.nativeElement.value = 1;
        dispatchEvent(input.nativeElement, 'input');
        fixture.detectChanges();
        expect(form.valid).toBeTruthy();
    }));

    it('should be valid when max is not specified', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.max = null;
        fixture.detectChanges();
        tick();

        const form = fixture.debugElement.children[0].injector.get(NgForm);
        const input = fixture.debugElement.query(By.css('input'));

        input.nativeElement.value = 1;
        dispatchEvent(input.nativeElement, 'input');
        fixture.detectChanges();
        expect(form.valid).toBeFalsy();
    }));

    it('should not be valid when value is greater than max', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.max = 1;
        fixture.detectChanges();
        tick();

        const form = fixture.debugElement.children[0].injector.get(NgForm);
        const input = fixture.debugElement.query(By.css('input'));

        input.nativeElement.value = 2;
        dispatchEvent(input.nativeElement, 'input');
        fixture.detectChanges();
        expect(form.valid).toBeFalsy();
    }));

    it('should not be valid when value is not specified', fakeAsync(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.componentInstance.max = 1;
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
