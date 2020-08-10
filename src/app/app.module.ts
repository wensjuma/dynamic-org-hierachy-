import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AddchartComponent } from './addchart/addchart.component';
import { ViewchartComponent } from './viewchart/viewchart.component';
import { OrgachartDirective } from './orgachart.directive';

@NgModule({
  declarations: [
    AppComponent,
    AddchartComponent,
    ViewchartComponent,
    OrgachartDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
