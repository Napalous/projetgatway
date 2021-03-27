import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBovin, Bovin } from '../bovin.model';
import { BovinService } from '../service/bovin.service';

@Injectable({ providedIn: 'root' })
export class BovinRoutingResolveService implements Resolve<IBovin> {
  constructor(protected service: BovinService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBovin> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((bovin: HttpResponse<Bovin>) => {
          if (bovin.body) {
            return of(bovin.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Bovin());
  }
}
