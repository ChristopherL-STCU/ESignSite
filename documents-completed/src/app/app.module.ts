import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AccordionModule } from 'ng2-accordion';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

import { AppComponent } from './app.component';
import { MaxDateDirective } from './validators/max-date.directive';
import { MinDateDirective } from './validators/min-date.directive';
import { MinDirective } from './validators/min.directive';
import { MaxDirective } from './validators/max.directive';
import { CsvDirective } from './csv/csv.directive';

@NgModule({
    declarations: [
        AppComponent,
        MaxDateDirective,
        MinDateDirective,
        MinDirective,
        MaxDirective,
        CsvDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AccordionModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
