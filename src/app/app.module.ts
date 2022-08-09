import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ControllerGraphComponent } from './components/controller-graph/controller-graph.component';
import { SearchSelectorComponent } from './components/search-selector/search-selector.component';
import { SearchTextComponent } from './components/search-text/search-text.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { CustomGraphBarComponent } from './components/custom-graph-bar/custom-graph-bar.component';
import { CustomAggregateBanksComponent } from './components/custom-aggregate-banks/custom-aggregate-banks.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TableRegistersComponent } from './components/table-registers/table-registers.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    ControllerGraphComponent,
    SearchSelectorComponent,
    SearchTextComponent,
    HomeComponent,
    CustomGraphBarComponent,
    CustomAggregateBanksComponent,
    TableRegistersComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    NgxChartsModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
