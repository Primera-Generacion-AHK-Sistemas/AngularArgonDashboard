import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsListAssetsComponent } from './details-list-assets.component';

describe('DetailsListAssetsComponent', () => {
  let component: DetailsListAssetsComponent;
  let fixture: ComponentFixture<DetailsListAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsListAssetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsListAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
