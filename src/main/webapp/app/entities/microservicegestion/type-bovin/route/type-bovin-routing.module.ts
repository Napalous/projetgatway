import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TypeBovinComponent } from '../list/type-bovin.component';
import { TypeBovinDetailComponent } from '../detail/type-bovin-detail.component';
import { TypeBovinUpdateComponent } from '../update/type-bovin-update.component';
import { TypeBovinRoutingResolveService } from './type-bovin-routing-resolve.service';

const typeBovinRoute: Routes = [
  {
    path: '',
    component: TypeBovinComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TypeBovinDetailComponent,
    resolve: {
      typeBovin: TypeBovinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TypeBovinUpdateComponent,
    resolve: {
      typeBovin: TypeBovinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TypeBovinUpdateComponent,
    resolve: {
      typeBovin: TypeBovinRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(typeBovinRoute)],
  exports: [RouterModule],
})
export class TypeBovinRoutingModule {}
