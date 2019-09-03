import { Utilisateur } from './utilisateur';

export class Ecole {

    idEcole: number;
    nomEcole: string;
    utilisateur: Utilisateur; // @ManyToOne
}
