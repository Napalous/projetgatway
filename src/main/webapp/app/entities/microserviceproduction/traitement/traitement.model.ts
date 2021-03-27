import * as dayjs from 'dayjs';

export interface ITraitement {
  id?: number;
  traitement?: string;
  datetraitement?: dayjs.Dayjs;
}

export class Traitement implements ITraitement {
  constructor(public id?: number, public traitement?: string, public datetraitement?: dayjs.Dayjs) {}
}

export function getTraitementIdentifier(traitement: ITraitement): number | undefined {
  return traitement.id;
}
