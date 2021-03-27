import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { FicheMedicalComponent } from './list/fiche-medical.component';
import { FicheMedicalDetailComponent } from './detail/fiche-medical-detail.component';
import { FicheMedicalUpdateComponent } from './update/fiche-medical-update.component';
import { FicheMedicalDeleteDialogComponent } from './delete/fiche-medical-delete-dialog.component';
import { FicheMedicalRoutingModule } from './route/fiche-medical-routing.module';

@NgModule({
  imports: [SharedModule, FicheMedicalRoutingModule],
  declarations: [FicheMedicalComponent, FicheMedicalDetailComponent, FicheMedicalUpdateComponent, FicheMedicalDeleteDialogComponent],
  entryComponents: [FicheMedicalDeleteDialogComponent],
})
export class MicroserviceproductionFicheMedicalModule {}
