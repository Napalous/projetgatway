import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeBovin } from '../type-bovin.model';

@Component({
  selector: 'jhi-type-bovin-detail',
  templateUrl: './type-bovin-detail.component.html',
})
export class TypeBovinDetailComponent implements OnInit {
  typeBovin: ITypeBovin | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeBovin }) => {
      this.typeBovin = typeBovin;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
