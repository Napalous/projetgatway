import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITypeBovin, TypeBovin } from '../type-bovin.model';
import { TypeBovinService } from '../service/type-bovin.service';

@Component({
  selector: 'jhi-type-bovin-update',
  templateUrl: './type-bovin-update.component.html',
})
export class TypeBovinUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
  });

  constructor(protected typeBovinService: TypeBovinService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeBovin }) => {
      this.updateForm(typeBovin);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const typeBovin = this.createFromForm();
    if (typeBovin.id !== undefined) {
      this.subscribeToSaveResponse(this.typeBovinService.update(typeBovin));
    } else {
      this.subscribeToSaveResponse(this.typeBovinService.create(typeBovin));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeBovin>>): void {
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

  protected updateForm(typeBovin: ITypeBovin): void {
    this.editForm.patchValue({
      id: typeBovin.id,
      libelle: typeBovin.libelle,
    });
  }

  protected createFromForm(): ITypeBovin {
    return {
      ...new TypeBovin(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
    };
  }
}
