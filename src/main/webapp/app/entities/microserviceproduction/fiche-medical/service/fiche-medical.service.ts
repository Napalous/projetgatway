import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFicheMedical, getFicheMedicalIdentifier } from '../fiche-medical.model';

export type EntityResponseType = HttpResponse<IFicheMedical>;
export type EntityArrayResponseType = HttpResponse<IFicheMedical[]>;

@Injectable({ providedIn: 'root' })
export class FicheMedicalService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/fiche-medicals', 'microserviceproduction');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(ficheMedical: IFicheMedical): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ficheMedical);
    return this.http
      .post<IFicheMedical>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ficheMedical: IFicheMedical): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ficheMedical);
    return this.http
      .put<IFicheMedical>(`${this.resourceUrl}/${getFicheMedicalIdentifier(ficheMedical) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(ficheMedical: IFicheMedical): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ficheMedical);
    return this.http
      .patch<IFicheMedical>(`${this.resourceUrl}/${getFicheMedicalIdentifier(ficheMedical) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFicheMedical>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFicheMedical[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addFicheMedicalToCollectionIfMissing(
    ficheMedicalCollection: IFicheMedical[],
    ...ficheMedicalsToCheck: (IFicheMedical | null | undefined)[]
  ): IFicheMedical[] {
    const ficheMedicals: IFicheMedical[] = ficheMedicalsToCheck.filter(isPresent);
    if (ficheMedicals.length > 0) {
      const ficheMedicalCollectionIdentifiers = ficheMedicalCollection.map(
        ficheMedicalItem => getFicheMedicalIdentifier(ficheMedicalItem)!
      );
      const ficheMedicalsToAdd = ficheMedicals.filter(ficheMedicalItem => {
        const ficheMedicalIdentifier = getFicheMedicalIdentifier(ficheMedicalItem);
        if (ficheMedicalIdentifier == null || ficheMedicalCollectionIdentifiers.includes(ficheMedicalIdentifier)) {
          return false;
        }
        ficheMedicalCollectionIdentifiers.push(ficheMedicalIdentifier);
        return true;
      });
      return [...ficheMedicalsToAdd, ...ficheMedicalCollection];
    }
    return ficheMedicalCollection;
  }

  protected convertDateFromClient(ficheMedical: IFicheMedical): IFicheMedical {
    return Object.assign({}, ficheMedical, {
      dateconsultation: ficheMedical.dateconsultation?.isValid() ? ficheMedical.dateconsultation.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateconsultation = res.body.dateconsultation ? dayjs(res.body.dateconsultation) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ficheMedical: IFicheMedical) => {
        ficheMedical.dateconsultation = ficheMedical.dateconsultation ? dayjs(ficheMedical.dateconsultation) : undefined;
      });
    }
    return res;
  }
}
