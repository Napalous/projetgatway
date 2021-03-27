import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRace, getRaceIdentifier } from '../race.model';

export type EntityResponseType = HttpResponse<IRace>;
export type EntityArrayResponseType = HttpResponse<IRace[]>;

@Injectable({ providedIn: 'root' })
export class RaceService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/races', 'microservicegestion');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(race: IRace): Observable<EntityResponseType> {
    return this.http.post<IRace>(this.resourceUrl, race, { observe: 'response' });
  }

  update(race: IRace): Observable<EntityResponseType> {
    return this.http.put<IRace>(`${this.resourceUrl}/${getRaceIdentifier(race) as number}`, race, { observe: 'response' });
  }

  partialUpdate(race: IRace): Observable<EntityResponseType> {
    return this.http.patch<IRace>(`${this.resourceUrl}/${getRaceIdentifier(race) as number}`, race, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRace>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRace[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRaceToCollectionIfMissing(raceCollection: IRace[], ...racesToCheck: (IRace | null | undefined)[]): IRace[] {
    const races: IRace[] = racesToCheck.filter(isPresent);
    if (races.length > 0) {
      const raceCollectionIdentifiers = raceCollection.map(raceItem => getRaceIdentifier(raceItem)!);
      const racesToAdd = races.filter(raceItem => {
        const raceIdentifier = getRaceIdentifier(raceItem);
        if (raceIdentifier == null || raceCollectionIdentifiers.includes(raceIdentifier)) {
          return false;
        }
        raceCollectionIdentifiers.push(raceIdentifier);
        return true;
      });
      return [...racesToAdd, ...raceCollection];
    }
    return raceCollection;
  }
}
