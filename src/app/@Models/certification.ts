import { Candidat } from './candidat';
import { Utilisateur } from './utilisateur';

export class Certification {

    id: number;
    nomCertification: string;
    descriptionDetaillee: string;
    selected: boolean;
    utilisateur: Utilisateur; // @ManyToOne

    constructor(id: number, nomCertification: string, descriptionDetaillee: string) {
        this.id = id;
        this.nomCertification = nomCertification;
        this.descriptionDetaillee =  descriptionDetaillee;
    }
}
