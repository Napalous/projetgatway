import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TraitementComponent } from './list/traitement.component';
import { TraitementDetailComponent } from './detail/traitement-detail.component';
import { TraitementUpdateComponent } from './update/traitement-update.component';
import { TraitementDeleteDialogComponent } from './delete/traitement-delete-dialog.component';
import { TraitementRoutingModule } from './route/traitement-routing.module';

@NgModule({
  imports: [SharedModule, TraitementRoutingModule],
  declarations: [TraitementComponent, TraitementDetailComponent, TraitementUpdateComponent, TraitementDeleteDialogComponent],
  entryComponents: [TraitementDeleteDialogComponent],
})
export class MicroserviceproductionTraitementModule {}
