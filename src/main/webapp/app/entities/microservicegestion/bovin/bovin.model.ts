import * as dayjs from 'dayjs';
import { IRace } from 'app/entities/microservicegestion/race/race.model';
import { ITypeBovin } from 'app/entities/microservicegestion/type-bovin/type-bovin.model';

export interface IBovin {
  id?: number;
  numero?: string;
  sexe?: string;
  datenaissance?: dayjs.Dayjs;
  race?: IRace | null;
  typeBovin?: ITypeBovin | null;
}

export class Bovin implements IBovin {
  constructor(
    public id?: number,
    public numero?: string,
    public sexe?: string,
    public datenaissance?: dayjs.Dayjs,
    public race?: IRace | null,
    public typeBovin?: ITypeBovin | null
  ) {}
}

export function getBovinIdentifier(bovin: IBovin): number | undefined {
  return bovin.id;
}
