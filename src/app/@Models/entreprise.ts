export class Entreprise {
    
    idEntreprise: number;
    nomEntreprise: string;
    descriptionDetaillee;

    constructor(idEntreprise: number, nomEntreprise: string, descriptionDetaillee: string) {
        this.idEntreprise = idEntreprise;
        this.nomEntreprise = nomEntreprise;
        this.descriptionDetaillee =  descriptionDetaillee;
    }
}