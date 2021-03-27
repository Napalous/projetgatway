import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ProductionLaitComponent } from './list/production-lait.component';
import { ProductionLaitDetailComponent } from './detail/production-lait-detail.component';
import { ProductionLaitUpdateComponent } from './update/production-lait-update.component';
import { ProductionLaitDeleteDialogComponent } from './delete/production-lait-delete-dialog.component';
import { ProductionLaitRoutingModule } from './route/production-lait-routing.module';

@NgModule({
  imports: [SharedModule, ProductionLaitRoutingModule],
  declarations: [
    ProductionLaitComponent,
    ProductionLaitDetailComponent,
    ProductionLaitUpdateComponent,
    ProductionLaitDeleteDialogComponent,
  ],
  entryComponents: [ProductionLaitDeleteDialogComponent],
})
export class MicroserviceproductionProductionLaitModule {}
