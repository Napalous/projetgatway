import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProductionLaitComponent } from '../list/production-lait.component';
import { ProductionLaitDetailComponent } from '../detail/production-lait-detail.component';
import { ProductionLaitUpdateComponent } from '../update/production-lait-update.component';
import { ProductionLaitRoutingResolveService } from './production-lait-routing-resolve.service';

const productionLaitRoute: Routes = [
  {
    path: '',
    component: ProductionLaitComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductionLaitDetailComponent,
    resolve: {
      productionLait: ProductionLaitRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductionLaitUpdateComponent,
    resolve: {
      productionLait: ProductionLaitRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductionLaitUpdateComponent,
    resolve: {
      productionLait: ProductionLaitRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(productionLaitRoute)],
  exports: [RouterModule],
})
export class ProductionLaitRoutingModule {}
