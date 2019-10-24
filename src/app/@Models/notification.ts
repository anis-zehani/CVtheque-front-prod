import { Etat } from './enums';
import { Utilisateur } from './utilisateur';

export class Notification {
    id: number;
    generateurNotification: Utilisateur; // EX : Système / Partenaire
    objetNotification: string;
    corpstNotification: string;
    dateAjout: string;
    etatNotification: Etat; // Enum : True/False
  }
