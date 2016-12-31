/* tslint:disable:no-unused-variable */


import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { FormsModule, NgForm } from '@angular/forms';
import { AccordionModule } from 'ng2-accordion';

import { AppComponent } from './app.component';

import { CompletedDocumentsService } from './completed-documents.service';
import { MaxDateDirective } from './validators/max-date.directive';
import { MinDateDirective } from './validators/min-date.directive';
import { MaxDirective } from './validators/max.directive';
import { MinDirective } from './validators/min.directive';

describe('AppComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AccordionModule, FormsModule, HttpModule],
            declarations: [AppComponent, MaxDateDirective, MinDateDirective, MinDirective, MaxDirective]
        });
        TestBed.compileComponents();
    }));

    it('should create the app', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should set default values', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;

        expect(app.completedDocuments.count).toBe(0);
        expect(app.submitted).toBeFalsy();
        expect(app.hasError).toBeFalsy();
        expect(app.hasResult).toBeFalsy();
    }));

    it('should set default date', async(() => {
        jasmine.clock().mockDate(new Date(2017, 0, 1));

        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;

        expect(app.query.startDate).toBe('12/31/2016');
        expect(app.query.startTime).toBe(6);
        expect(app.maxDate).toBe('1/1/2017');
        expect(app.minDate).toBe('12/25/2016');
    }));

    it('should display "Invalid start date time" when Start Date is invalid', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;

        let result = app.formatEndDate({valid: false});

        expect(result).toBe('Invalid start date time');
    }));

    it('should display display next day after start date', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;

        app.query.startDate = '12/31/2016';
        app.query.startTime = 0;

        let result = app.formatEndDate({valid: true});

        expect(result).toBe('1/1/2017 0:00');
    }));

    it('should reset form when look up error occurs', fakeAsync(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;

        spyOn(app.completedDocumentsService, 'getCompletedDocuments').and.callFake(
            () => { return Observable.throw(new Error('error!')); }
        );

        app.lookUp();
        tick();

        expect(app.completedDocuments.count).toBe(0);
        expect(app.submitted).toBeFalsy();
        expect(app.hasError).toBeTruthy();
        expect(app.hasResult).toBeFalsy();
    }));

    it('should display completed documents after look up', fakeAsync(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;

        spyOn(app.completedDocumentsService, 'getCompletedDocuments').and.returnValue(
            Observable.of({count: 1, documents: [{}]})
        );

        app.lookUp();
        tick();

        expect(app.completedDocuments.count).toBe(1);
        expect(app.submitted).toBeFalsy();
        expect(app.hasError).toBeFalsy();
        expect(app.hasResult).toBeTruthy();
    }));

});
