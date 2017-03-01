import { DocumentsCompletedPage } from './app.po';

describe('documents-completed App', function() {
    let page: DocumentsCompletedPage;

    beforeEach(() => {
        page = new DocumentsCompletedPage();
    });

    it('should set the start date time', () => {
        page.navigateTo();

        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate() - 1));

        expect(page.getStartDate()).toEqual(yesterday.toLocaleDateString('en-US'));
        expect(page.getStartTime()).toEqual('6');
    });

    it('should display completed documents', () => {
        page.navigateTo();
        page.retrieveCompletedDocuments();

        expect(page.getCompletedCount().isDisplayed()).toBe(true);
    });
});
