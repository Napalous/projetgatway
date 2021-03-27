import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITypeBovin } from '../type-bovin.model';
import { TypeBovinService } from '../service/type-bovin.service';

@Component({
  templateUrl: './type-bovin-delete-dialog.component.html',
})
export class TypeBovinDeleteDialogComponent {
  typeBovin?: ITypeBovin;

  constructor(protected typeBovinService: TypeBovinService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.typeBovinService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
