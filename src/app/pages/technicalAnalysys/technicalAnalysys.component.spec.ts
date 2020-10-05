import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalAnalysysComponent } from './technicalAnalysys.component';

describe('TechnicalAnalysysComponent', () => {
    let component: TechnicalAnalysysComponent;
    let fixture: ComponentFixture<TechnicalAnalysysComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TechnicalAnalysysComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TechnicalAnalysysComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
