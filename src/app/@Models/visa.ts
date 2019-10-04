import { TypeVisa } from './enums';

export class Visa {

    id: number;
    typeVisa: TypeVisa;
    dateDebutVisa: Date;
    dateFinVisa: Date;
    /*Paramètres AutoFill : le candidat remplira ça tout seul via son espace candidat*/
    typeVisaAutoFill: TypeVisa;
    dateDebutVisaAutoFill: Date;
    dateFinVisaAutoFill: Date;
}
