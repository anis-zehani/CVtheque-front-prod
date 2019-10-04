import { TypeDiplome } from './enums';
import { Ecole } from './ecole';

export class Diplome {

    id: number;
    typeDiplome: TypeDiplome;
    dateObtentionDiplome: Date;
    ecole: Ecole;
    /*Paramètres AutoFill : le candidat remplira ça tout seul via son espace candidat*/
    typeDiplomeAutoFill: TypeDiplome;
    dateObtentionDiplomeAutoFill: Date;
    ecoleAutoFill: string;
}
