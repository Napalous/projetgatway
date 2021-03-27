import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IBovin } from '../bovin.model';
import { BovinService } from '../service/bovin.service';

@Component({
  templateUrl: './bovin-delete-dialog.component.html',
})
export class BovinDeleteDialogComponent {
  bovin?: IBovin;

  constructor(protected bovinService: BovinService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bovinService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
