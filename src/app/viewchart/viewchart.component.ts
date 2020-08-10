import {
  Component, OnInit, OnChanges, Input, Renderer2, ElementRef,
  ViewChild, ChangeDetectionStrategy, SimpleChanges
} from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-viewchart',
  templateUrl: './viewchart.component.html',
  styleUrls: ['./viewchart.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewchartComponent implements OnInit, OnChanges {
  @Input() empArr;
  orgaArr = [];
  employees = [];
  isLoading: Boolean = true;

  constructor(private apiService: ApiService) {
    this.apiService.getOrgaStructure().subscribe(
      data => {
        console.log(data);
        
        this.orgaArr = data;
      }
    );
  }

  ngOnInit() {
    if (this.empArr.length > 0) {
      this.isLoading = false;
      this.employees = this.empArr;
    }
  }

  ngOnChanges() {
    if (this.empArr.length > 0) {
      this.isLoading = false;
      this.employees = this.empArr;
      console.log('this.employees => ', this.empArr);
    }
  }

}
