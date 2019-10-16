export class CandidatTemporaire {

    id: number;
    identite: string;
    username: string;
    password: string;
    email: string;

    constructor(id: number, identite: string, username: string, password: string, email: string) {
      this.id = id;
      this.identite = identite;
      this.username = username;
      this.password = password;
      this.email = email;
    }
  }
