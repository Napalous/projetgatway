import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TypeBovinComponent } from './list/type-bovin.component';
import { TypeBovinDetailComponent } from './detail/type-bovin-detail.component';
import { TypeBovinUpdateComponent } from './update/type-bovin-update.component';
import { TypeBovinDeleteDialogComponent } from './delete/type-bovin-delete-dialog.component';
import { TypeBovinRoutingModule } from './route/type-bovin-routing.module';

@NgModule({
  imports: [SharedModule, TypeBovinRoutingModule],
  declarations: [TypeBovinComponent, TypeBovinDetailComponent, TypeBovinUpdateComponent, TypeBovinDeleteDialogComponent],
  entryComponents: [TypeBovinDeleteDialogComponent],
})
export class MicroservicegestionTypeBovinModule {}
