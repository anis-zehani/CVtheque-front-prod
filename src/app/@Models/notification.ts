import { Etat } from './enums';
import { Utilisateur } from './utilisateur';
import { Candidat } from './candidat';
import { PartenaireTemporaire } from './partenaire-temporaire';
import { Opportunite } from './opportunite';

export class Notification {
    id: number;
    generateurNotification: Utilisateur; // EX : Système / Partenaire
    objetNotification: string;
    corpstNotification: string;
    dateAjout: string;
    etatNotification: Etat; // Enum : True/False
    /*Paramètres d'informations supplémantaires pour l'affichage de la Pop-Up Notification*/
    candidatNotification: Candidat;
    partenaireTemporaireNotification: PartenaireTemporaire;
    opportuniteNotification: Opportunite;
  }
