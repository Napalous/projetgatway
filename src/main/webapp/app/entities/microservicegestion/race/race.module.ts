import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { RaceComponent } from './list/race.component';
import { RaceDetailComponent } from './detail/race-detail.component';
import { RaceUpdateComponent } from './update/race-update.component';
import { RaceDeleteDialogComponent } from './delete/race-delete-dialog.component';
import { RaceRoutingModule } from './route/race-routing.module';

@NgModule({
  imports: [SharedModule, RaceRoutingModule],
  declarations: [RaceComponent, RaceDetailComponent, RaceUpdateComponent, RaceDeleteDialogComponent],
  entryComponents: [RaceDeleteDialogComponent],
})
export class MicroservicegestionRaceModule {}
