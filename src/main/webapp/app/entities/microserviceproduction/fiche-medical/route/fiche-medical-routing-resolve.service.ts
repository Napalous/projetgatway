import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFicheMedical, FicheMedical } from '../fiche-medical.model';
import { FicheMedicalService } from '../service/fiche-medical.service';

@Injectable({ providedIn: 'root' })
export class FicheMedicalRoutingResolveService implements Resolve<IFicheMedical> {
  constructor(protected service: FicheMedicalService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFicheMedical> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ficheMedical: HttpResponse<FicheMedical>) => {
          if (ficheMedical.body) {
            return of(ficheMedical.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FicheMedical());
  }
}
