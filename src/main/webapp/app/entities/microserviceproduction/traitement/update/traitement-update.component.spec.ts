jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TraitementService } from '../service/traitement.service';
import { ITraitement, Traitement } from '../traitement.model';

import { TraitementUpdateComponent } from './traitement-update.component';

describe('Component Tests', () => {
  describe('Traitement Management Update Component', () => {
    let comp: TraitementUpdateComponent;
    let fixture: ComponentFixture<TraitementUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let traitementService: TraitementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TraitementUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TraitementUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TraitementUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      traitementService = TestBed.inject(TraitementService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const traitement: ITraitement = { id: 456 };

        activatedRoute.data = of({ traitement });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(traitement));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const traitement = { id: 123 };
        spyOn(traitementService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ traitement });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: traitement }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(traitementService.update).toHaveBeenCalledWith(traitement);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const traitement = new Traitement();
        spyOn(traitementService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ traitement });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: traitement }));
        saveSubject.complete();

        // THEN
        expect(traitementService.create).toHaveBeenCalledWith(traitement);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const traitement = { id: 123 };
        spyOn(traitementService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ traitement });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(traitementService.update).toHaveBeenCalledWith(traitement);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
