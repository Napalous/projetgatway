import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductionLait } from '../production-lait.model';
import { ProductionLaitService } from '../service/production-lait.service';

@Component({
  templateUrl: './production-lait-delete-dialog.component.html',
})
export class ProductionLaitDeleteDialogComponent {
  productionLait?: IProductionLait;

  constructor(protected productionLaitService: ProductionLaitService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productionLaitService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
