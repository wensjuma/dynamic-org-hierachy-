import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddchartComponent } from './addchart.component';

describe('AddchartComponent', () => {
  let component: AddchartComponent;
  let fixture: ComponentFixture<AddchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
