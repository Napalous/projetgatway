import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProductionLait, ProductionLait } from '../production-lait.model';
import { ProductionLaitService } from '../service/production-lait.service';

@Injectable({ providedIn: 'root' })
export class ProductionLaitRoutingResolveService implements Resolve<IProductionLait> {
  constructor(protected service: ProductionLaitService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductionLait> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((productionLait: HttpResponse<ProductionLait>) => {
          if (productionLait.body) {
            return of(productionLait.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductionLait());
  }
}
