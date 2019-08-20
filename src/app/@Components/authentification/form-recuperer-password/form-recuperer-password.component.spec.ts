import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecupererPasswordComponent } from './form-recuperer-password.component';

describe('FormRecupererPasswordComponent', () => {
  let component: FormRecupererPasswordComponent;
  let fixture: ComponentFixture<FormRecupererPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRecupererPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRecupererPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
