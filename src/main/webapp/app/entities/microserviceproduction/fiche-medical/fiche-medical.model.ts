import * as dayjs from 'dayjs';

export interface IFicheMedical {
  id?: number;
  observation?: string;
  dateconsultation?: dayjs.Dayjs;
}

export class FicheMedical implements IFicheMedical {
  constructor(public id?: number, public observation?: string, public dateconsultation?: dayjs.Dayjs) {}
}

export function getFicheMedicalIdentifier(ficheMedical: IFicheMedical): number | undefined {
  return ficheMedical.id;
}
