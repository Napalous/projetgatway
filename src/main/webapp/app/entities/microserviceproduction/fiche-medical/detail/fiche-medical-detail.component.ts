import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFicheMedical } from '../fiche-medical.model';

@Component({
  selector: 'jhi-fiche-medical-detail',
  templateUrl: './fiche-medical-detail.component.html',
})
export class FicheMedicalDetailComponent implements OnInit {
  ficheMedical: IFicheMedical | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ficheMedical }) => {
      this.ficheMedical = ficheMedical;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
