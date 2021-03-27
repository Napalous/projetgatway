import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBovin, getBovinIdentifier } from '../bovin.model';

export type EntityResponseType = HttpResponse<IBovin>;
export type EntityArrayResponseType = HttpResponse<IBovin[]>;

@Injectable({ providedIn: 'root' })
export class BovinService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/bovins', 'microservicegestion');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(bovin: IBovin): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bovin);
    return this.http
      .post<IBovin>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(bovin: IBovin): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bovin);
    return this.http
      .put<IBovin>(`${this.resourceUrl}/${getBovinIdentifier(bovin) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(bovin: IBovin): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bovin);
    return this.http
      .patch<IBovin>(`${this.resourceUrl}/${getBovinIdentifier(bovin) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBovin>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBovin[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addBovinToCollectionIfMissing(bovinCollection: IBovin[], ...bovinsToCheck: (IBovin | null | undefined)[]): IBovin[] {
    const bovins: IBovin[] = bovinsToCheck.filter(isPresent);
    if (bovins.length > 0) {
      const bovinCollectionIdentifiers = bovinCollection.map(bovinItem => getBovinIdentifier(bovinItem)!);
      const bovinsToAdd = bovins.filter(bovinItem => {
        const bovinIdentifier = getBovinIdentifier(bovinItem);
        if (bovinIdentifier == null || bovinCollectionIdentifiers.includes(bovinIdentifier)) {
          return false;
        }
        bovinCollectionIdentifiers.push(bovinIdentifier);
        return true;
      });
      return [...bovinsToAdd, ...bovinCollection];
    }
    return bovinCollection;
  }

  protected convertDateFromClient(bovin: IBovin): IBovin {
    return Object.assign({}, bovin, {
      datenaissance: bovin.datenaissance?.isValid() ? bovin.datenaissance.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datenaissance = res.body.datenaissance ? dayjs(res.body.datenaissance) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((bovin: IBovin) => {
        bovin.datenaissance = bovin.datenaissance ? dayjs(bovin.datenaissance) : undefined;
      });
    }
    return res;
  }
}
