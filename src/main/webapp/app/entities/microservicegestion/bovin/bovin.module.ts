import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { BovinComponent } from './list/bovin.component';
import { BovinDetailComponent } from './detail/bovin-detail.component';
import { BovinUpdateComponent } from './update/bovin-update.component';
import { BovinDeleteDialogComponent } from './delete/bovin-delete-dialog.component';
import { BovinRoutingModule } from './route/bovin-routing.module';

@NgModule({
  imports: [SharedModule, BovinRoutingModule],
  declarations: [BovinComponent, BovinDetailComponent, BovinUpdateComponent, BovinDeleteDialogComponent],
  entryComponents: [BovinDeleteDialogComponent],
})
export class MicroservicegestionBovinModule {}
