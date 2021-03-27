import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TraitementComponent } from '../list/traitement.component';
import { TraitementDetailComponent } from '../detail/traitement-detail.component';
import { TraitementUpdateComponent } from '../update/traitement-update.component';
import { TraitementRoutingResolveService } from './traitement-routing-resolve.service';

const traitementRoute: Routes = [
  {
    path: '',
    component: TraitementComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TraitementDetailComponent,
    resolve: {
      traitement: TraitementRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TraitementUpdateComponent,
    resolve: {
      traitement: TraitementRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TraitementUpdateComponent,
    resolve: {
      traitement: TraitementRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(traitementRoute)],
  exports: [RouterModule],
})
export class TraitementRoutingModule {}
