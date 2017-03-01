import { Component } from '@angular/core';
import { Query } from './query';
import { CompletedDocumentsService } from './completed-documents.service';
import { CompletedDocuments } from './completed-documents';
import { AccordionModule } from 'ng2-accordion';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [CompletedDocumentsService]
})
export class AppComponent {
    public query: Query;
    public submitted: boolean;
    public completedDocuments: CompletedDocuments;
    public maxDate: string;
    public minDate: string;
    public hasError: boolean;
    public hasResult: boolean;

    constructor(private completedDocumentsService: CompletedDocumentsService) {
        const today = new Date();
        const weekFromToday = new Date(new Date().setDate(today.getDate() - 7));
        const yesterday = new Date(new Date().setDate(today.getDate() - 1));

        this.query = new Query(yesterday.toLocaleDateString('en-US'), 6);
        this.maxDate = today.toLocaleDateString('en-US');
        this.minDate = weekFromToday.toLocaleDateString('en-US');

        this.completedDocuments = new CompletedDocuments([], 0);
        this.submitted = false;
        this.hasError = false;
        this.hasResult = false;
    }

    lookUp() {
        this.completedDocuments = new CompletedDocuments([], 0);
        this.hasError = false;
        this.hasResult = false;
        this.submitted = true;

        this.completedDocumentsService
            .getCompletedDocuments(this.query)
            .subscribe(completedDocuments => {
                this.completedDocuments = completedDocuments;
                this.submitted = false;
                this.hasResult = true;
            }, error => {
                this.hasError = true;
                this.submitted = false;
            });
    }

    formatEndDate(form) {
        const startDate = new Date(this.query.startDate);
        const endDate = (new Date(startDate.setDate(startDate.getDate() + 1))).toLocaleDateString('en-US');

        return form.valid
            ? endDate + ' ' + this.query.startTime + ':00'
            : 'Invalid start date time';
    }
}
