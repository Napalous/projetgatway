import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductionLait } from '../production-lait.model';

@Component({
  selector: 'jhi-production-lait-detail',
  templateUrl: './production-lait-detail.component.html',
})
export class ProductionLaitDetailComponent implements OnInit {
  productionLait: IProductionLait | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productionLait }) => {
      this.productionLait = productionLait;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
