import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITraitement } from '../traitement.model';
import { TraitementService } from '../service/traitement.service';

@Component({
  templateUrl: './traitement-delete-dialog.component.html',
})
export class TraitementDeleteDialogComponent {
  traitement?: ITraitement;

  constructor(protected traitementService: TraitementService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.traitementService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
