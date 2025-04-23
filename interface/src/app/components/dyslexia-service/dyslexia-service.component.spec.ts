import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyslexiaServicesComponent } from './dyslexia-service.component';

describe('DyslexiaServiceComponent', () => {
  let component: DyslexiaServicesComponent;
  let fixture: ComponentFixture<DyslexiaServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DyslexiaServicesComponent]
    });
    fixture = TestBed.createComponent(DyslexiaServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
