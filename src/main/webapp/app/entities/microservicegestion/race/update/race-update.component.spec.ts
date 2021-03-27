jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { RaceService } from '../service/race.service';
import { IRace, Race } from '../race.model';

import { RaceUpdateComponent } from './race-update.component';

describe('Component Tests', () => {
  describe('Race Management Update Component', () => {
    let comp: RaceUpdateComponent;
    let fixture: ComponentFixture<RaceUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let raceService: RaceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [RaceUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(RaceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RaceUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      raceService = TestBed.inject(RaceService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const race: IRace = { id: 456 };

        activatedRoute.data = of({ race });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(race));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const race = { id: 123 };
        spyOn(raceService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ race });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: race }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(raceService.update).toHaveBeenCalledWith(race);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const race = new Race();
        spyOn(raceService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ race });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: race }));
        saveSubject.complete();

        // THEN
        expect(raceService.create).toHaveBeenCalledWith(race);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const race = { id: 123 };
        spyOn(raceService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ race });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(raceService.update).toHaveBeenCalledWith(race);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
