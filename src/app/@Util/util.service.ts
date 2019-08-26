import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private snackBar: MatSnackBar) { }

  // Affiche une Notification SnackBar en bas de l'écran
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['snackbar']
    });
  }

  // Affiche une Notification d'erreur en bas de l'écran
  openSnackBarErreur(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['snackbarErreur']
    });
  }
}
