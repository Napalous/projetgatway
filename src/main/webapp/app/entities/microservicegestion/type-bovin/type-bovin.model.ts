import { IBovin } from 'app/entities/microservicegestion/bovin/bovin.model';

export interface ITypeBovin {
  id?: number;
  libelle?: string;
  bovins?: IBovin[] | null;
}

export class TypeBovin implements ITypeBovin {
  constructor(public id?: number, public libelle?: string, public bovins?: IBovin[] | null) {}
}

export function getTypeBovinIdentifier(typeBovin: ITypeBovin): number | undefined {
  return typeBovin.id;
}
