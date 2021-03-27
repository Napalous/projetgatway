import * as dayjs from 'dayjs';

export interface IProductionLait {
  id?: number;
  quantite?: number;
  dateproduction?: dayjs.Dayjs;
}

export class ProductionLait implements IProductionLait {
  constructor(public id?: number, public quantite?: number, public dateproduction?: dayjs.Dayjs) {}
}

export function getProductionLaitIdentifier(productionLait: IProductionLait): number | undefined {
  return productionLait.id;
}
