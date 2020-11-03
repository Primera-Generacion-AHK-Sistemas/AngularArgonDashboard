import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SercheableComponent } from './sercheable-dropdown.component';

describe('SercheableComponent', () => {
    let component: SercheableComponent;
    beforeEach(async(() => {
    }));

    beforeEach(() => {
    });

    it('should create', () => {
    });
});


/*
import { TestBed, async } from '@angular/core/testing';
import { SelectableDropdownComponent } from './selectable-dropdown.component';

describe('SelectableDropdownComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectableDropdownComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SelectableDropdownComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-reactive-forms'`, () => {
    const fixture = TestBed.createComponent(SelectableDropdownComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-reactive-forms');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(SelectableDropdownComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-reactive-forms!');
  });
});
*/
