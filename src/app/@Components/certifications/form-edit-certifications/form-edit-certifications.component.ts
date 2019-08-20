import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Certification } from '../../../@Models/certification';

@Component({
  selector: 'app-form-edit-certifications',
  templateUrl: './form-edit-certifications.component.html'
})
export class FormEditCertificationsComponent implements OnInit {

  certification : Certification;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Certification) 
  {
    this.certification = new Certification(null, null,null);
  }

  ngOnInit() {
  }

}
