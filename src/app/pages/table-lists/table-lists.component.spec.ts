import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListsComponent } from './table-lists.component';

describe('TableListsComponent', () => {
  let component: TableListsComponent;
  let fixture: ComponentFixture<TableListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
