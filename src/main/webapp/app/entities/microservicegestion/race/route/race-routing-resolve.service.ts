import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRace, Race } from '../race.model';
import { RaceService } from '../service/race.service';

@Injectable({ providedIn: 'root' })
export class RaceRoutingResolveService implements Resolve<IRace> {
  constructor(protected service: RaceService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRace> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((race: HttpResponse<Race>) => {
          if (race.body) {
            return of(race.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Race());
  }
}
