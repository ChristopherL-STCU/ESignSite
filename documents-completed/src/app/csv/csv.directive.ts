import { Directive, HostListener, Input } from '@angular/core';
import { CompletedPackage } from '../completed-package';

@Directive({
  selector: '[appCsv]',
})
export class CsvDirective {
  @Input('appCsv') appCsv: CompletedPackage[];

  @HostListener('click') onClick() {
    let uri = 'data:text/csv;charset=utf-8,' + encodeURI(this.format());
    let link = document.createElement("a");

    link.href = uri;
    link.setAttribute('visibility','hidden');
    link.download = 'CompletedDocuments.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

    private format() {
        var concatPackageNameToDocumentName = packageItem =>
            packageItem.documents.map(document => packageItem.name + ' : ' + document);

        return this.appCsv
            .map(concatPackageNameToDocumentName)
            .reduce((allDocuments, packageDocuments) => allDocuments.concat(packageDocuments))
            .join('\r\n');
    }
}
