jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { BovinService } from '../service/bovin.service';
import { IBovin, Bovin } from '../bovin.model';
import { IRace } from 'app/entities/microservicegestion/race/race.model';
import { RaceService } from 'app/entities/microservicegestion/race/service/race.service';
import { ITypeBovin } from 'app/entities/microservicegestion/type-bovin/type-bovin.model';
import { TypeBovinService } from 'app/entities/microservicegestion/type-bovin/service/type-bovin.service';

import { BovinUpdateComponent } from './bovin-update.component';

describe('Component Tests', () => {
  describe('Bovin Management Update Component', () => {
    let comp: BovinUpdateComponent;
    let fixture: ComponentFixture<BovinUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let bovinService: BovinService;
    let raceService: RaceService;
    let typeBovinService: TypeBovinService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [BovinUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(BovinUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BovinUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      bovinService = TestBed.inject(BovinService);
      raceService = TestBed.inject(RaceService);
      typeBovinService = TestBed.inject(TypeBovinService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Race query and add missing value', () => {
        const bovin: IBovin = { id: 456 };
        const race: IRace = { id: 63017 };
        bovin.race = race;

        const raceCollection: IRace[] = [{ id: 29416 }];
        spyOn(raceService, 'query').and.returnValue(of(new HttpResponse({ body: raceCollection })));
        const additionalRaces = [race];
        const expectedCollection: IRace[] = [...additionalRaces, ...raceCollection];
        spyOn(raceService, 'addRaceToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ bovin });
        comp.ngOnInit();

        expect(raceService.query).toHaveBeenCalled();
        expect(raceService.addRaceToCollectionIfMissing).toHaveBeenCalledWith(raceCollection, ...additionalRaces);
        expect(comp.racesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call TypeBovin query and add missing value', () => {
        const bovin: IBovin = { id: 456 };
        const typeBovin: ITypeBovin = { id: 15882 };
        bovin.typeBovin = typeBovin;

        const typeBovinCollection: ITypeBovin[] = [{ id: 40154 }];
        spyOn(typeBovinService, 'query').and.returnValue(of(new HttpResponse({ body: typeBovinCollection })));
        const additionalTypeBovins = [typeBovin];
        const expectedCollection: ITypeBovin[] = [...additionalTypeBovins, ...typeBovinCollection];
        spyOn(typeBovinService, 'addTypeBovinToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ bovin });
        comp.ngOnInit();

        expect(typeBovinService.query).toHaveBeenCalled();
        expect(typeBovinService.addTypeBovinToCollectionIfMissing).toHaveBeenCalledWith(typeBovinCollection, ...additionalTypeBovins);
        expect(comp.typeBovinsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const bovin: IBovin = { id: 456 };
        const race: IRace = { id: 28344 };
        bovin.race = race;
        const typeBovin: ITypeBovin = { id: 14159 };
        bovin.typeBovin = typeBovin;

        activatedRoute.data = of({ bovin });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(bovin));
        expect(comp.racesSharedCollection).toContain(race);
        expect(comp.typeBovinsSharedCollection).toContain(typeBovin);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const bovin = { id: 123 };
        spyOn(bovinService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ bovin });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: bovin }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(bovinService.update).toHaveBeenCalledWith(bovin);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const bovin = new Bovin();
        spyOn(bovinService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ bovin });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: bovin }));
        saveSubject.complete();

        // THEN
        expect(bovinService.create).toHaveBeenCalledWith(bovin);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const bovin = { id: 123 };
        spyOn(bovinService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ bovin });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(bovinService.update).toHaveBeenCalledWith(bovin);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackRaceById', () => {
        it('Should return tracked Race primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackRaceById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackTypeBovinById', () => {
        it('Should return tracked TypeBovin primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTypeBovinById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
