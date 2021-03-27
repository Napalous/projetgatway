import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFicheMedical } from '../fiche-medical.model';
import { FicheMedicalService } from '../service/fiche-medical.service';

@Component({
  templateUrl: './fiche-medical-delete-dialog.component.html',
})
export class FicheMedicalDeleteDialogComponent {
  ficheMedical?: IFicheMedical;

  constructor(protected ficheMedicalService: FicheMedicalService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ficheMedicalService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
