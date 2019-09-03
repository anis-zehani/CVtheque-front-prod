import { Utilisateur } from './utilisateur';

export class Collaborateur {
  id: number;
  identite: string;
  email: string;
  username: string;
  password: string;
  utilisateur: Utilisateur; // @ManyToOne
}
