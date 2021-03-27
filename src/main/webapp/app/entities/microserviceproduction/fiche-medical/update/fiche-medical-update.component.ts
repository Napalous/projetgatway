import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IFicheMedical, FicheMedical } from '../fiche-medical.model';
import { FicheMedicalService } from '../service/fiche-medical.service';

@Component({
  selector: 'jhi-fiche-medical-update',
  templateUrl: './fiche-medical-update.component.html',
})
export class FicheMedicalUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    observation: [null, [Validators.required]],
    dateconsultation: [null, [Validators.required]],
  });

  constructor(protected ficheMedicalService: FicheMedicalService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ficheMedical }) => {
      if (ficheMedical.id === undefined) {
        const today = dayjs().startOf('day');
        ficheMedical.dateconsultation = today;
      }

      this.updateForm(ficheMedical);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ficheMedical = this.createFromForm();
    if (ficheMedical.id !== undefined) {
      this.subscribeToSaveResponse(this.ficheMedicalService.update(ficheMedical));
    } else {
      this.subscribeToSaveResponse(this.ficheMedicalService.create(ficheMedical));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFicheMedical>>): void {
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

  protected updateForm(ficheMedical: IFicheMedical): void {
    this.editForm.patchValue({
      id: ficheMedical.id,
      observation: ficheMedical.observation,
      dateconsultation: ficheMedical.dateconsultation ? ficheMedical.dateconsultation.format(DATE_TIME_FORMAT) : null,
    });
  }

  protected createFromForm(): IFicheMedical {
    return {
      ...new FicheMedical(),
      id: this.editForm.get(['id'])!.value,
      observation: this.editForm.get(['observation'])!.value,
      dateconsultation: this.editForm.get(['dateconsultation'])!.value
        ? dayjs(this.editForm.get(['dateconsultation'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
