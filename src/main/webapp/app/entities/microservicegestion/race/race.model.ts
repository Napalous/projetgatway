import { IBovin } from 'app/entities/microservicegestion/bovin/bovin.model';

export interface IRace {
  id?: number;
  libelle?: string;
  imageContentType?: string | null;
  image?: string | null;
  bovins?: IBovin[] | null;
}

export class Race implements IRace {
  constructor(
    public id?: number,
    public libelle?: string,
    public imageContentType?: string | null,
    public image?: string | null,
    public bovins?: IBovin[] | null
  ) {}
}

export function getRaceIdentifier(race: IRace): number | undefined {
  return race.id;
}
