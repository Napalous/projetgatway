import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITypeBovin, TypeBovin } from '../type-bovin.model';
import { TypeBovinService } from '../service/type-bovin.service';

@Injectable({ providedIn: 'root' })
export class TypeBovinRoutingResolveService implements Resolve<ITypeBovin> {
  constructor(protected service: TypeBovinService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeBovin> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((typeBovin: HttpResponse<TypeBovin>) => {
          if (typeBovin.body) {
            return of(typeBovin.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TypeBovin());
  }
}
