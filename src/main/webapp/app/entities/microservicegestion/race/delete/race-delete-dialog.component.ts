import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRace } from '../race.model';
import { RaceService } from '../service/race.service';

@Component({
  templateUrl: './race-delete-dialog.component.html',
})
export class RaceDeleteDialogComponent {
  race?: IRace;

  constructor(protected raceService: RaceService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.raceService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
