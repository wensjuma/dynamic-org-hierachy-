import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  empObjArr = [];
  constructor() { }

  private dataSource = new BehaviorSubject<any>(this.empObjArr);
  content = this.dataSource.asObservable();

  public setEmpArr(content) {
    console.log('content => ', content);
    this.dataSource.next(content);
  }
}
