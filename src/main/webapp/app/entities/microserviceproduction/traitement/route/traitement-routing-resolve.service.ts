import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITraitement, Traitement } from '../traitement.model';
import { TraitementService } from '../service/traitement.service';

@Injectable({ providedIn: 'root' })
export class TraitementRoutingResolveService implements Resolve<ITraitement> {
  constructor(protected service: TraitementService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITraitement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((traitement: HttpResponse<Traitement>) => {
          if (traitement.body) {
            return of(traitement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Traitement());
  }
}
