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
    public maxDate: number;
    public minDate: number;
    public hasError: boolean;
    public hasResult: boolean;

    constructor(private completedDocumentsService: CompletedDocumentsService) {
        let today = new Date();
        let weekFromToday = new Date(new Date().setDate(today.getDate() - 7));
        let yesterday = new Date(new Date().setDate(today.getDate() - 1));

        this.query = new Query(yesterday, 6);
        this.maxDate = today.getTime();
        this.minDate = weekFromToday.getTime();

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
        let startDate = new Date(this.query.startDate);
        let endDate = (new Date(startDate.setDate(startDate.getDate() + 1))).toLocaleDateString('en-US');
        return form.valid
            ? endDate + ' ' + this.query.startTime + ':00'
            : 'Invalid start date time';
    }
}
