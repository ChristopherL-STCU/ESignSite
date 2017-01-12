import { browser, element, by } from 'protractor';

export class DocumentsCompletedPage {
    navigateTo() {
        return browser.get('/');
    }

    retrieveCompletedDocuments() {
        element(by.buttonText('Look up')).click();
    }

    getStartDate() {
        return element(by.id('startDate')).getAttribute('value');
    }

    getStartTime() {
        return element(by.id('startTime')).getAttribute('value');
    }

    getCompletedCount() {
        // by.binding not supported in angular2 yet
        return element(by.css('.well-large span'));
    }
}
