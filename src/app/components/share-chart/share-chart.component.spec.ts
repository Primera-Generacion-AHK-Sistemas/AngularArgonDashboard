import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareChartComponent } from './share-chart.component';

import {NgSelectModule, NgOption} from '@ng-select/ng-select';

describe('ShareChartComponent', () => {
  let component: ShareChartComponent;
  let fixture: ComponentFixture<ShareChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
