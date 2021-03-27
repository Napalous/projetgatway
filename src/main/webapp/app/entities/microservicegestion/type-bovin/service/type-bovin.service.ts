import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITypeBovin, getTypeBovinIdentifier } from '../type-bovin.model';

export type EntityResponseType = HttpResponse<ITypeBovin>;
export type EntityArrayResponseType = HttpResponse<ITypeBovin[]>;

@Injectable({ providedIn: 'root' })
export class TypeBovinService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/type-bovins', 'microservicegestion');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(typeBovin: ITypeBovin): Observable<EntityResponseType> {
    return this.http.post<ITypeBovin>(this.resourceUrl, typeBovin, { observe: 'response' });
  }

  update(typeBovin: ITypeBovin): Observable<EntityResponseType> {
    return this.http.put<ITypeBovin>(`${this.resourceUrl}/${getTypeBovinIdentifier(typeBovin) as number}`, typeBovin, {
      observe: 'response',
    });
  }

  partialUpdate(typeBovin: ITypeBovin): Observable<EntityResponseType> {
    return this.http.patch<ITypeBovin>(`${this.resourceUrl}/${getTypeBovinIdentifier(typeBovin) as number}`, typeBovin, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeBovin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeBovin[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTypeBovinToCollectionIfMissing(
    typeBovinCollection: ITypeBovin[],
    ...typeBovinsToCheck: (ITypeBovin | null | undefined)[]
  ): ITypeBovin[] {
    const typeBovins: ITypeBovin[] = typeBovinsToCheck.filter(isPresent);
    if (typeBovins.length > 0) {
      const typeBovinCollectionIdentifiers = typeBovinCollection.map(typeBovinItem => getTypeBovinIdentifier(typeBovinItem)!);
      const typeBovinsToAdd = typeBovins.filter(typeBovinItem => {
        const typeBovinIdentifier = getTypeBovinIdentifier(typeBovinItem);
        if (typeBovinIdentifier == null || typeBovinCollectionIdentifiers.includes(typeBovinIdentifier)) {
          return false;
        }
        typeBovinCollectionIdentifiers.push(typeBovinIdentifier);
        return true;
      });
      return [...typeBovinsToAdd, ...typeBovinCollection];
    }
    return typeBovinCollection;
  }
}
