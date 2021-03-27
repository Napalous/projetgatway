import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { BovinComponent } from '../list/bovin.component';
import { BovinDetailComponent } from '../detail/bovin-detail.component';
import { BovinUpdateComponent } from '../update/bovin-update.component';
import { BovinRoutingResolveService } from './bovin-routing-resolve.service';

const bovinRoute: Routes = [
  {
    path: '',
    component: BovinComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BovinDetailComponent,
    resolve: {
      bovin: BovinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BovinUpdateComponent,
    resolve: {
      bovin: BovinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BovinUpdateComponent,
    resolve: {
      bovin: BovinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(bovinRoute)],
  exports: [RouterModule],
})
export class BovinRoutingModule {}
