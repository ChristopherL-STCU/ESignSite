import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { CompletedDocuments } from './completed-documents';
import { Query } from './query';
import { COMPLETEDDOCUMENTS } from './mock-completed-documents';

@Injectable()
export class CompletedDocumentsService {
    private code = 'a033VEPZ04RyfUkoOE8APyzvu3xjIwzB7yr9qXiLF7bBAT04ITDxQA==';
    private url = `https://esign-sandbox.azurewebsites.net/api/DocumentsCompleted?code=${this.code}&clientid=esign`;

    constructor(private http: Http) { }

    getMockCompletedDocuments(query: Query): Observable<CompletedDocuments> {
        return Observable.of(COMPLETEDDOCUMENTS);
    }

    getCompletedDocuments(query: Query): Observable<CompletedDocuments> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http
            .post(this.url, {startDate: query.startDate, startTime: + query.startTime}, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Bad response status: ' + response.status);
        }
        let body = response.json();
        return body || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
