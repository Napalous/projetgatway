import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IProductionLait, ProductionLait } from '../production-lait.model';
import { ProductionLaitService } from '../service/production-lait.service';

@Component({
  selector: 'jhi-production-lait-update',
  templateUrl: './production-lait-update.component.html',
})
export class ProductionLaitUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    quantite: [null, [Validators.required]],
    dateproduction: [null, [Validators.required]],
  });

  constructor(
    protected productionLaitService: ProductionLaitService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productionLait }) => {
      if (productionLait.id === undefined) {
        const today = dayjs().startOf('day');
        productionLait.dateproduction = today;
      }

      this.updateForm(productionLait);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productionLait = this.createFromForm();
    if (productionLait.id !== undefined) {
      this.subscribeToSaveResponse(this.productionLaitService.update(productionLait));
    } else {
      this.subscribeToSaveResponse(this.productionLaitService.create(productionLait));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductionLait>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(productionLait: IProductionLait): void {
    this.editForm.patchValue({
      id: productionLait.id,
      quantite: productionLait.quantite,
      dateproduction: productionLait.dateproduction ? productionLait.dateproduction.format(DATE_TIME_FORMAT) : null,
    });
  }

  protected createFromForm(): IProductionLait {
    return {
      ...new ProductionLait(),
      id: this.editForm.get(['id'])!.value,
      quantite: this.editForm.get(['quantite'])!.value,
      dateproduction: this.editForm.get(['dateproduction'])!.value
        ? dayjs(this.editForm.get(['dateproduction'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
