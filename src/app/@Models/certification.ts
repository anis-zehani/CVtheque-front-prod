import { Candidat } from './candidat';

export class Certification {
    
    id: number;
    nomCertification: string;
    descriptionDetaillee : string;
    selected: boolean;

    constructor(id: number, nomCertification: string, descriptionDetaillee: string) {
        this.id = id;
        this.nomCertification = nomCertification;
        this.descriptionDetaillee =  descriptionDetaillee;
    }
}
