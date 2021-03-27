jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { FicheMedicalService } from '../service/fiche-medical.service';
import { IFicheMedical, FicheMedical } from '../fiche-medical.model';

import { FicheMedicalUpdateComponent } from './fiche-medical-update.component';

describe('Component Tests', () => {
  describe('FicheMedical Management Update Component', () => {
    let comp: FicheMedicalUpdateComponent;
    let fixture: ComponentFixture<FicheMedicalUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let ficheMedicalService: FicheMedicalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [FicheMedicalUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(FicheMedicalUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FicheMedicalUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      ficheMedicalService = TestBed.inject(FicheMedicalService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const ficheMedical: IFicheMedical = { id: 456 };

        activatedRoute.data = of({ ficheMedical });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(ficheMedical));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const ficheMedical = { id: 123 };
        spyOn(ficheMedicalService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ ficheMedical });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: ficheMedical }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(ficheMedicalService.update).toHaveBeenCalledWith(ficheMedical);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const ficheMedical = new FicheMedical();
        spyOn(ficheMedicalService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ ficheMedical });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: ficheMedical }));
        saveSubject.complete();

        // THEN
        expect(ficheMedicalService.create).toHaveBeenCalledWith(ficheMedical);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const ficheMedical = { id: 123 };
        spyOn(ficheMedicalService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ ficheMedical });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(ficheMedicalService.update).toHaveBeenCalledWith(ficheMedical);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
