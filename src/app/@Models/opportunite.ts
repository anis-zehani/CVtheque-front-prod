import { Partenaire } from '../@Models/partenaire';
import { Etat, Visibilite } from '../@Models/enums';
import { Technologie } from './technologie';
import { Certification } from './certification';
import { Utilisateur } from './utilisateur';

export class Opportunite {

    id: number;
    titreOpportunite: string;
    descriptionOpportunite: string;
    dateAjout: Date;
    dateDemarrageSouhaitee: Date;
    tjmOpportunite: string;
    urlPhotoOpportunite: string;
    etatOpportunite: Etat; // Enum : True/False pour Active/Inactive
    visibiliteOpportunite: string; // Enum : Public/Private
    responsableOpportunite: Partenaire;
    listeTechnologies: Technologie[];
    listeCertifications: Certification[];

    selected: boolean;
    utilisateur: Utilisateur; // @ManyToOne

    constructor(id: number, titreOpportunite: string) {
        this.id = id;
        this.titreOpportunite = titreOpportunite;
    }
}
