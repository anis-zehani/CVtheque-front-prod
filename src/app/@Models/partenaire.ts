import { Entreprise } from '../@Models/entreprise';
import { Etat } from '../@Models/enums';

export class Partenaire {
    id: number;
    identite: string;
    telephone: string;
    email: string;
    posteOccupe: string;
    descriptionDetaillee: string;
    urlPhoto: string;
    username: string;
    password: string;
    entreprise: Entreprise;
    etatPartenaire: Etat; // Enum : True/False pour Actif/Inactif

    /*Paramètres AutoFill : le partenaire remplira ça tout seul via son espace partenaire*/

    emailPartenaireAutoFill: string;
    telephonePartenaireAutoFill: string;
    entrepriseActuellePartenaireAutoFill: string;
    posteOccupePartenaireAutoFill: string;
    telephoneEntreprisePartenaireAutoFill: string;
    effectifEntreprisePartenaireAutoFill: string;
    siteInternetEntreprisePartenaireAutoFill: string;
    adresseEntreprisePartenaireAutoFill: string;
    descriptionDetailleePartenaireAutoFill: string;
    urlPhotoPartenaireAutoFill: string;
  }
