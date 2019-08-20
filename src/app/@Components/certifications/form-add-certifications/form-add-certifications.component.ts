import { Component, OnInit , Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CertificationsService } from '../../../@Services/certifications.service';
import { UtilService } from '../../../@Util/util.service';

@Component({
  selector: 'app-form-add-certifications',
  templateUrl: './form-add-certifications.component.html'
  
})
export class FormAddCertificationsComponent implements OnInit {

  //Envoi l'event pour mettre à jour la table
  @Output() refreshTableEvent = new EventEmitter<Event>();

  //Mon Reactive Form
  formCertification = new FormGroup({
    nomCertification: new FormControl('', Validators.nullValidator),
    descriptionDetaillee: new FormControl('', Validators.nullValidator)
  });

  constructor(private certificationsService: CertificationsService, private utilService: UtilService) {}

  ngOnInit() {
  }

  //Quand on ajoute une Certification : un EVENT est envoyé au Parent pour rafraichir la table
  refreshTableFunction($event){
    this.refreshTableEvent.emit($event);
  }

  //Ajouter une certification 
  addCertificationController() {
    this.certificationsService.addCertificationService(this.formCertification.value)
    .subscribe
      (res => 
        { if(res != null)
          { 
          this.refreshTableFunction(true);
          this.utilService.openSnackBar("Certification ajoutée", "OK"); 
          }
        }
      )
      this.formCertification.reset();  
  }
}
