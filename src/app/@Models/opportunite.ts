import { Partenaire } from '../@Models/partenaire';
import { Etat } from '../@Models/enums';
import { Technologie } from './technologie';
import { Candidat } from './candidat';
import { Certification } from './certification';

export class Opportunite {
    
    id: number;
    titreOpportunite: string;
    descriptionOpportunite:string;
    dateAjout:Date;
    dateDemarrageSouhaitee:Date;
    tjmOpportunite:string;
    urlPhotoOpportunite:string;
    etatOpportunite:Etat; //Enum : True/False pour Active/Inactive
    responsableOpportunite:Partenaire;
    listeTechnologies : Technologie[];
    listeCertifications : Certification[];

    selected: boolean;

    constructor(id: number, titreOpportunite: string) {
        this.id = id;
        this.titreOpportunite = titreOpportunite;
    }
}
