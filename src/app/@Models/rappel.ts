import { Etat, Priorite } from './enums';
import { Projet } from './projet';
import { Utilisateur } from './utilisateur';

export class Rappel {

    id: number;
    remindMe: boolean;
    detailsRappel: string;
    dateEcheance:Date;
    priorite: Priorite;
    urlFichier: string;
    nomFichier: string;

    projet:Projet; //@ManyToOne
    utilisateur:Utilisateur; //@ManyToOne
}
