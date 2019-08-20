import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddCompteCandidatComponent } from './form-add-compte-candidat.component';

describe('FormAddCompteCandidatComponent', () => {
  let component: FormAddCompteCandidatComponent;
  let fixture: ComponentFixture<FormAddCompteCandidatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddCompteCandidatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddCompteCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
