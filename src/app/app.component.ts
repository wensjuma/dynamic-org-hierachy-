import { Component, AfterViewInit, ViewChild, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ApiService } from './api.service';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  empArr = [];

  constructor(private apiService: ApiService, private sharedService: SharedService) {
    this.apiService.getEmployee().subscribe(
      data => {
        this.empArr = data;
        console.log(this.empArr);
      }
    );
  }

  getempdetails(evt) {
    this.empArr = evt;
    this.sharedService.setEmpArr(this.empArr);
  }

}
