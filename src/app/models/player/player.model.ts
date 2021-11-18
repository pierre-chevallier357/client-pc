import { Decision } from '../decision/decision.model';

export class Player {
  nom: String = null;
  coup: Decision = null;
  resultat: any;
  connect: boolean;
  id: number;
  strategie: any;
}
