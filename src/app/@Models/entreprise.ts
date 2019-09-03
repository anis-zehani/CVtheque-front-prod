import { Utilisateur } from './utilisateur';

export class Entreprise {
    idEntreprise: number;
    nomEntreprise: string;
    descriptionDetaillee: string;
    utilisateur: Utilisateur; // @ManyToOne

    constructor(idEntreprise: number, nomEntreprise: string, descriptionDetaillee: string) {
        this.idEntreprise = idEntreprise;
        this.nomEntreprise = nomEntreprise;
        this.descriptionDetaillee =  descriptionDetaillee;
    }
}
