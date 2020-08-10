import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-addchart',
  templateUrl: './addchart.component.html',
  styleUrls: ['./addchart.component.scss']
})
export class AddchartComponent implements OnInit, OnChanges {
  orgaArr = [];
  empArr = [];
  @Output() empdetails = new EventEmitter;
  employees = [];
  addFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private sharedService: SharedService) {
    this.addFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      desg: ['', [Validators.required]],
      supervisor: ['', [Validators.required]]
    });
    this.apiService.getOrgaStructure().subscribe(
      data => {
        this.orgaArr = data.filter(ele => ele.designation_parentid !== 0);
        console.log(this.orgaArr);
      }
    );
    this.apiService.getEmployee().subscribe(
      data => {
        this.empArr = data;
        console.log(this.empArr);
      }
    );
  }

  ngOnInit() {

  }

  ngOnChanges() {
    // console.log('this.employees => ', this.empArr);
  }

  addForm() {
    if (this.addFormGroup.valid) {
      console.log('this.addFormGroup.value => ', this.addFormGroup.value);
      this.addempdetails(this.addFormGroup.value);
    }
    console.log('this.addFormGroup => ', this.addFormGroup);
  }

  addempdetails(empdt) {
    const desgEle = this.orgaArr.filter(ele => ele.designation_id === parseInt(empdt.desg, 0));
    console.log('desgEle => ', desgEle);
    console.log('this.empArr => ', this.empArr);
    const empLen = this.empArr.length;
    const lastEmpId = this.empArr[empLen - 1].empid;
    const obj = {
      empid: lastEmpId + 1,
      empname: empdt.name,
      parentid: desgEle[0].designation_parentid,
      empdesgid: desgEle[0].designation_id,
      // tslint:disable-next-line:radix
      supervisorid: parseInt(empdt.supervisor),
      empdesgname: desgEle[0].designation_name
    };
    this.empArr.push(obj);
    console.log('this.empArr => ', this.empArr);
    this.empdetails.emit(this.empArr);
  }

  checksupervisors(desgid) {
    console.log(desgid);
    this.employees = this.empArr.filter(ele => ele.empdesgid === desgid - 1);
    console.log(this.employees);
  }

}
