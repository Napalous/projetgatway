import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITraitement, getTraitementIdentifier } from '../traitement.model';

export type EntityResponseType = HttpResponse<ITraitement>;
export type EntityArrayResponseType = HttpResponse<ITraitement[]>;

@Injectable({ providedIn: 'root' })
export class TraitementService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/traitements', 'microserviceproduction');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(traitement: ITraitement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(traitement);
    return this.http
      .post<ITraitement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(traitement: ITraitement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(traitement);
    return this.http
      .put<ITraitement>(`${this.resourceUrl}/${getTraitementIdentifier(traitement) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(traitement: ITraitement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(traitement);
    return this.http
      .patch<ITraitement>(`${this.resourceUrl}/${getTraitementIdentifier(traitement) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITraitement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITraitement[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTraitementToCollectionIfMissing(
    traitementCollection: ITraitement[],
    ...traitementsToCheck: (ITraitement | null | undefined)[]
  ): ITraitement[] {
    const traitements: ITraitement[] = traitementsToCheck.filter(isPresent);
    if (traitements.length > 0) {
      const traitementCollectionIdentifiers = traitementCollection.map(traitementItem => getTraitementIdentifier(traitementItem)!);
      const traitementsToAdd = traitements.filter(traitementItem => {
        const traitementIdentifier = getTraitementIdentifier(traitementItem);
        if (traitementIdentifier == null || traitementCollectionIdentifiers.includes(traitementIdentifier)) {
          return false;
        }
        traitementCollectionIdentifiers.push(traitementIdentifier);
        return true;
      });
      return [...traitementsToAdd, ...traitementCollection];
    }
    return traitementCollection;
  }

  protected convertDateFromClient(traitement: ITraitement): ITraitement {
    return Object.assign({}, traitement, {
      datetraitement: traitement.datetraitement?.isValid() ? traitement.datetraitement.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datetraitement = res.body.datetraitement ? dayjs(res.body.datetraitement) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((traitement: ITraitement) => {
        traitement.datetraitement = traitement.datetraitement ? dayjs(traitement.datetraitement) : undefined;
      });
    }
    return res;
  }
}
