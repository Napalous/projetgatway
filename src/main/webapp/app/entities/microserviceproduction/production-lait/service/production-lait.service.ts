import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProductionLait, getProductionLaitIdentifier } from '../production-lait.model';

export type EntityResponseType = HttpResponse<IProductionLait>;
export type EntityArrayResponseType = HttpResponse<IProductionLait[]>;

@Injectable({ providedIn: 'root' })
export class ProductionLaitService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/production-laits', 'microserviceproduction');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(productionLait: IProductionLait): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productionLait);
    return this.http
      .post<IProductionLait>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(productionLait: IProductionLait): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productionLait);
    return this.http
      .put<IProductionLait>(`${this.resourceUrl}/${getProductionLaitIdentifier(productionLait) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(productionLait: IProductionLait): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productionLait);
    return this.http
      .patch<IProductionLait>(`${this.resourceUrl}/${getProductionLaitIdentifier(productionLait) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProductionLait>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProductionLait[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProductionLaitToCollectionIfMissing(
    productionLaitCollection: IProductionLait[],
    ...productionLaitsToCheck: (IProductionLait | null | undefined)[]
  ): IProductionLait[] {
    const productionLaits: IProductionLait[] = productionLaitsToCheck.filter(isPresent);
    if (productionLaits.length > 0) {
      const productionLaitCollectionIdentifiers = productionLaitCollection.map(
        productionLaitItem => getProductionLaitIdentifier(productionLaitItem)!
      );
      const productionLaitsToAdd = productionLaits.filter(productionLaitItem => {
        const productionLaitIdentifier = getProductionLaitIdentifier(productionLaitItem);
        if (productionLaitIdentifier == null || productionLaitCollectionIdentifiers.includes(productionLaitIdentifier)) {
          return false;
        }
        productionLaitCollectionIdentifiers.push(productionLaitIdentifier);
        return true;
      });
      return [...productionLaitsToAdd, ...productionLaitCollection];
    }
    return productionLaitCollection;
  }

  protected convertDateFromClient(productionLait: IProductionLait): IProductionLait {
    return Object.assign({}, productionLait, {
      dateproduction: productionLait.dateproduction?.isValid() ? productionLait.dateproduction.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateproduction = res.body.dateproduction ? dayjs(res.body.dateproduction) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((productionLait: IProductionLait) => {
        productionLait.dateproduction = productionLait.dateproduction ? dayjs(productionLait.dateproduction) : undefined;
      });
    }
    return res;
  }
}
