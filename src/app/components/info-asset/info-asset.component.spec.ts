import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAssetComponent } from './info-asset.component';

describe('InfoAssetComponent', () => {
  let component: InfoAssetComponent;
  let fixture: ComponentFixture<InfoAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
