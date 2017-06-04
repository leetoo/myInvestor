import { NgModule, ApplicationRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { CustomToastOptions } from './custom-toast-options';
import { ToastOptions } from 'ng2-toastr';

import { FundamentalService } from './stock-picker/fundamental';

import 'hammerjs';

import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { ROUTES } from './app.routes';

import { SharedModule } from './shared';
import { CoreModule } from './core';

import { AppComponent } from './app.component';
import { StockPickerComponent } from './stock-picker';
import { PortfolioComponent } from './portfolio';
import { NoContentComponent } from './no-content/no-content.component';
import { DividendDetailsComponent } from './stock-picker/dividend-details';
import { AnalysisComponent } from './analysis/analysis.component';

@NgModule({
  declarations: [
    AppComponent,
    StockPickerComponent,
    PortfolioComponent,
    NoContentComponent,
    DividendDetailsComponent,
    AnalysisComponent
  ],
  providers: [
    { provide: ToastOptions, useClass: CustomToastOptions },
    FundamentalService
  ],
  entryComponents: [
    DividendDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    ToastModule.forRoot(),
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }