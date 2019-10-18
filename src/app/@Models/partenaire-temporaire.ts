export class PartenaireTemporaire {

    id: number;
    identite: string;
    telephone: string;
    email: string;
    username: string;
    password: string;
    entreprise: string;
    posteOccupe: string;
    descriptionDetaillee: string;

    constructor(id: number,
                identite: string,
                telephone: string,
                email: string,
                username: string,
                password: string,
                entreprise: string,
                posteOccupe: string,
                descriptionDetaillee: string,
    ) {
      this.id = id;
      this.identite = identite;
      this.telephone = telephone;
      this.email = email;
      this.username = username;
      this.password = password;
      this.entreprise = entreprise;
      this.posteOccupe = posteOccupe;
      this.descriptionDetaillee = descriptionDetaillee;
    }
  }
