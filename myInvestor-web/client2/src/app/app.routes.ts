import { Routes } from '@angular/router';
import { StockPickerComponent } from './stock-picker';
import { PortfolioComponent } from './portfolio';
import { NoContentComponent } from './no-content';
import { AnalysisComponent } from './analysis';
import { TechAnalysisComponent } from './tech-analysis';

export const ROUTES: Routes = [
  { path: 'analysis', component: AnalysisComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'notfound', component: NoContentComponent },
  { path: 'stock-picker/:exchangeName', component: StockPickerComponent },
  { path: 'tech-analysis/:category', component: TechAnalysisComponent },
  { path: 'dashboard', loadChildren: './dashboard#DashboardModule' },
  { path: 'info', loadChildren: './stock-info#StockInfoModule' },
  { path: '', loadChildren: './dashboard#DashboardModule' },
  { path: '**', component: NoContentComponent },
];
