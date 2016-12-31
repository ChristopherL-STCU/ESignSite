/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, HttpModule, ResponseOptions, XHRBackend, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Query } from './query';
import { CompletedDocumentsService } from './completed-documents.service';

describe('CompletedDocumentsService', () => {
    let backend: MockBackend;
    let service: CompletedDocumentsService;
    let query: Query;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                CompletedDocumentsService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        }).compileComponents();
    }));

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
        backend = be;
        service = new CompletedDocumentsService(http);
        query = new Query('1/1/2017', 0);
    }));

    it('should retrieve completed documents', async(() => {
        let options = new ResponseOptions({ status: 200, body: { count: 1, documents: [{}] } });
        let response = new Response(options);
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.getCompletedDocuments(query)
            .do(result => {
                expect(result.count).toBe(1);
            }).toPromise();
    }));

    it('should write error when failure to retrieve completed documents', async(() => {
        let options = new ResponseOptions({ status: 500, body: { message: 'test failure' } });
        let response = new Response(options);
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
        spyOn(console, 'error');

        service.getCompletedDocuments(query)
            .do(result => {
                fail('should not respond with heroes');
            })
            .catch(error => {
                expect(error).toMatch(/Bad response status/);
                expect(console.error).toHaveBeenCalledWith('An error occurred', jasmine.any(Object));
                return Observable.of(null);
            }).toPromise();
    }));
});
