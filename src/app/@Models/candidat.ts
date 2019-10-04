import { Entreprise } from './entreprise';
import { SituationFamiliale, Note, Disponibilite, Etat } from './enums';
import { Diplome } from './diplome';
import { Curriculum } from './curriculum';
import { Visa } from './visa';
import { Technologie } from './technologie';
import { Opportunite } from './opportunite';
import { Certification } from './certification';
import { Utilisateur } from './utilisateur';


export class Candidat {
    // Attributs hérités de la classe Utilisateur
    id: number;
    idLinkedin: string;
    identite: string;
    username: string;
    password: string;
    telephone: string;
    email: string;
    posteOccupe: string;
    descriptionDetaillee: string;
    urlPhoto: string;
    entreprise: Entreprise; // @ManyToOne

    // Attributs de Classe
    dateDeNaissance: Date;
    adresse: string;
    situationFamiliale: SituationFamiliale; // Enum (voir BackEnd)
    nombreEnfants: string;
    salaireActuel: string;
    pretentionSalariale: string;
    niveauEnFrancais: Note; // Enum
    niveauEnAnglais: Note; // Enum
    noteGlobale: Note; // Enum
    disponibilite: Disponibilite; // Enum
    etatCandidat: Etat; // Enum : True/False pour Actif/Inactif
    dateDemarrageCarriere: Date;
    dateEpuisementPasseport: Date;

    diplome: Diplome;
    curriculum: Curriculum;
    visa: Visa;

    listeTechnologies: Technologie[]; // ManyToMany
    listeOpportunites: Opportunite[];  // ManyToMany
    listeCertifications: Certification[];  // ManyToMany

    selected: boolean;
    utilisateur: Utilisateur; // @ManyToOne

    /*Paramètres AutoFill : le candidat remplira ça tout seul via son espace candidat*/
    telephoneAutoFill: string;
    emailAutoFill: string;
    posteOccupeAutoFill: string;
    salaireActuelAutoFill: string;
    pretentionSalarialeAutoFill: string;
    entrepriseAutoFill: string;
    urlPhotoAutoFill: string;
    disponibiliteAutoFill: Disponibilite;
    dateDemarrageCarriereAutoFill: Date;
    dateEpuisementPasseportAutoFill: Date;
    situationFamilialeAutoFill: SituationFamiliale;
    nombreEnfantsAutoFill: string;
    adresseAutoFill: string;
    descriptionDetailleeAutoFill: string;

    constructor(id: number) {
      this.id = id;
    }
  }
