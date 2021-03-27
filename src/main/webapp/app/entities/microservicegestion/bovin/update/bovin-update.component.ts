import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IBovin, Bovin } from '../bovin.model';
import { BovinService } from '../service/bovin.service';
import { IRace } from 'app/entities/microservicegestion/race/race.model';
import { RaceService } from 'app/entities/microservicegestion/race/service/race.service';
import { ITypeBovin } from 'app/entities/microservicegestion/type-bovin/type-bovin.model';
import { TypeBovinService } from 'app/entities/microservicegestion/type-bovin/service/type-bovin.service';

@Component({
  selector: 'jhi-bovin-update',
  templateUrl: './bovin-update.component.html',
})
export class BovinUpdateComponent implements OnInit {
  isSaving = false;

  racesSharedCollection: IRace[] = [];
  typeBovinsSharedCollection: ITypeBovin[] = [];

  editForm = this.fb.group({
    id: [],
    numero: [null, [Validators.required]],
    sexe: [null, [Validators.required]],
    datenaissance: [null, [Validators.required]],
    race: [],
    typeBovin: [],
  });

  constructor(
    protected bovinService: BovinService,
    protected raceService: RaceService,
    protected typeBovinService: TypeBovinService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bovin }) => {
      if (bovin.id === undefined) {
        const today = dayjs().startOf('day');
        bovin.datenaissance = today;
      }

      this.updateForm(bovin);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bovin = this.createFromForm();
    if (bovin.id !== undefined) {
      this.subscribeToSaveResponse(this.bovinService.update(bovin));
    } else {
      this.subscribeToSaveResponse(this.bovinService.create(bovin));
    }
  }

  trackRaceById(index: number, item: IRace): number {
    return item.id!;
  }

  trackTypeBovinById(index: number, item: ITypeBovin): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBovin>>): void {
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

  protected updateForm(bovin: IBovin): void {
    this.editForm.patchValue({
      id: bovin.id,
      numero: bovin.numero,
      sexe: bovin.sexe,
      datenaissance: bovin.datenaissance ? bovin.datenaissance.format(DATE_TIME_FORMAT) : null,
      race: bovin.race,
      typeBovin: bovin.typeBovin,
    });

    this.racesSharedCollection = this.raceService.addRaceToCollectionIfMissing(this.racesSharedCollection, bovin.race);
    this.typeBovinsSharedCollection = this.typeBovinService.addTypeBovinToCollectionIfMissing(
      this.typeBovinsSharedCollection,
      bovin.typeBovin
    );
  }

  protected loadRelationshipsOptions(): void {
    this.raceService
      .query()
      .pipe(map((res: HttpResponse<IRace[]>) => res.body ?? []))
      .pipe(map((races: IRace[]) => this.raceService.addRaceToCollectionIfMissing(races, this.editForm.get('race')!.value)))
      .subscribe((races: IRace[]) => (this.racesSharedCollection = races));

    this.typeBovinService
      .query()
      .pipe(map((res: HttpResponse<ITypeBovin[]>) => res.body ?? []))
      .pipe(
        map((typeBovins: ITypeBovin[]) =>
          this.typeBovinService.addTypeBovinToCollectionIfMissing(typeBovins, this.editForm.get('typeBovin')!.value)
        )
      )
      .subscribe((typeBovins: ITypeBovin[]) => (this.typeBovinsSharedCollection = typeBovins));
  }

  protected createFromForm(): IBovin {
    return {
      ...new Bovin(),
      id: this.editForm.get(['id'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      datenaissance: this.editForm.get(['datenaissance'])!.value
        ? dayjs(this.editForm.get(['datenaissance'])!.value, DATE_TIME_FORMAT)
        : undefined,
      race: this.editForm.get(['race'])!.value,
      typeBovin: this.editForm.get(['typeBovin'])!.value,
    };
  }
}
