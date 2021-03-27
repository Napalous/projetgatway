import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBovin } from '../bovin.model';

@Component({
  selector: 'jhi-bovin-detail',
  templateUrl: './bovin-detail.component.html',
})
export class BovinDetailComponent implements OnInit {
  bovin: IBovin | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bovin }) => {
      this.bovin = bovin;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
