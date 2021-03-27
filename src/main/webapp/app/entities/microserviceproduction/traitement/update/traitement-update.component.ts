import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ITraitement, Traitement } from '../traitement.model';
import { TraitementService } from '../service/traitement.service';

@Component({
  selector: 'jhi-traitement-update',
  templateUrl: './traitement-update.component.html',
})
export class TraitementUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    traitement: [null, [Validators.required]],
    datetraitement: [null, [Validators.required]],
  });

  constructor(protected traitementService: TraitementService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ traitement }) => {
      if (traitement.id === undefined) {
        const today = dayjs().startOf('day');
        traitement.datetraitement = today;
      }

      this.updateForm(traitement);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const traitement = this.createFromForm();
    if (traitement.id !== undefined) {
      this.subscribeToSaveResponse(this.traitementService.update(traitement));
    } else {
      this.subscribeToSaveResponse(this.traitementService.create(traitement));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITraitement>>): void {
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

  protected updateForm(traitement: ITraitement): void {
    this.editForm.patchValue({
      id: traitement.id,
      traitement: traitement.traitement,
      datetraitement: traitement.datetraitement ? traitement.datetraitement.format(DATE_TIME_FORMAT) : null,
    });
  }

  protected createFromForm(): ITraitement {
    return {
      ...new Traitement(),
      id: this.editForm.get(['id'])!.value,
      traitement: this.editForm.get(['traitement'])!.value,
      datetraitement: this.editForm.get(['datetraitement'])!.value
        ? dayjs(this.editForm.get(['datetraitement'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
