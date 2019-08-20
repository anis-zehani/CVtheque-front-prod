import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  // Mon Reactive Form
  formAuthentification = new FormGroup({
    email: new FormControl('admin', Validators.nullValidator),
    password: new FormControl('admin', Validators.nullValidator)
  });

  constructor() { }

  ngOnInit() {
  }

  authentification() {
  }

}
