import { Utilisateur } from './utilisateur';

export class Ecole {

    idEcole: number;
    nomEcole: string;
    descriptionDetaillee: string;
    utilisateur: Utilisateur; // @ManyToOne
}
