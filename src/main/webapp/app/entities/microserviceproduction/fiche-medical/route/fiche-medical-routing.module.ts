import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FicheMedicalComponent } from '../list/fiche-medical.component';
import { FicheMedicalDetailComponent } from '../detail/fiche-medical-detail.component';
import { FicheMedicalUpdateComponent } from '../update/fiche-medical-update.component';
import { FicheMedicalRoutingResolveService } from './fiche-medical-routing-resolve.service';

const ficheMedicalRoute: Routes = [
  {
    path: '',
    component: FicheMedicalComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FicheMedicalDetailComponent,
    resolve: {
      ficheMedical: FicheMedicalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FicheMedicalUpdateComponent,
    resolve: {
      ficheMedical: FicheMedicalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FicheMedicalUpdateComponent,
    resolve: {
      ficheMedical: FicheMedicalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ficheMedicalRoute)],
  exports: [RouterModule],
})
export class FicheMedicalRoutingModule {}
