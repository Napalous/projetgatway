import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RaceComponent } from '../list/race.component';
import { RaceDetailComponent } from '../detail/race-detail.component';
import { RaceUpdateComponent } from '../update/race-update.component';
import { RaceRoutingResolveService } from './race-routing-resolve.service';

const raceRoute: Routes = [
  {
    path: '',
    component: RaceComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RaceDetailComponent,
    resolve: {
      race: RaceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RaceUpdateComponent,
    resolve: {
      race: RaceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RaceUpdateComponent,
    resolve: {
      race: RaceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(raceRoute)],
  exports: [RouterModule],
})
export class RaceRoutingModule {}
