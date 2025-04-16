import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyslexiaTestComponent } from './dyslexia-test.component';

describe('DyslexiaTestComponent', () => {
  let component: DyslexiaTestComponent;
  let fixture: ComponentFixture<DyslexiaTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DyslexiaTestComponent]
    });
    fixture = TestBed.createComponent(DyslexiaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
