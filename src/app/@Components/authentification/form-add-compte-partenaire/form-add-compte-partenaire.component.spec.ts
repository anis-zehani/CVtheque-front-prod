import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddComptePartenaireComponent } from './form-add-compte-partenaire.component';

describe('FormAddComptePartenaireComponent', () => {
  let component: FormAddComptePartenaireComponent;
  let fixture: ComponentFixture<FormAddComptePartenaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddComptePartenaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddComptePartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
