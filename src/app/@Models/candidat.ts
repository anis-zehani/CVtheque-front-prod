import { Entreprise } from './entreprise';
import { SituationFamiliale, Note, Disponibilite, Etat } from './enums';
import { Diplome } from './diplome';
import { Curriculum } from './curriculum';
import { Visa } from './visa';
import { Technologie } from './technologie';
import { Opportunite } from './opportunite';
import { Certification } from './certification';


export class Candidat {
    //Attributs hérités de la classe Utilisateur
    id: number;
    identite: string;
    telephone:string;
    email:string;
    posteOccupe:string;
    descriptionDetaillee:string;
    urlPhoto:string;
    entreprise:Entreprise; //@ManyToOne

    //Attributs de Classe 
    dateDeNaissance : Date;
    adresse : string;
    situationFamiliale : SituationFamiliale //Enum (voir BackEnd)
    nombreEnfants : string;
    salaireActuel : string;
    pretentionSalariale : string;
    niveauEnFrancais : Note; //Enum 
    niveauEnAnglais : Note; //Enum 
    noteGlobale : Note; //Enum 
    disponibilite : Disponibilite; //Enum 
    etatCandidat : Etat; //Enum : True/False pour Actif/Inactif
    dateDemarrageCarriere : Date;
    dateEpuisementPasseport : Date;

    diplome : Diplome;
    curriculum : Curriculum;
    visa : Visa;

    listeTechnologies : Technologie[]; //ManyToMany
    listeOpportunites : Opportunite[];  //ManyToMany
    listeCertifications : Certification[];  //ManyToMany

    selected: boolean;

    constructor(id: number) {
      this.id = id;
    }
  }
  