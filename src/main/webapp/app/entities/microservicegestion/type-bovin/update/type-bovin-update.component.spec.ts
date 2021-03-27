jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TypeBovinService } from '../service/type-bovin.service';
import { ITypeBovin, TypeBovin } from '../type-bovin.model';

import { TypeBovinUpdateComponent } from './type-bovin-update.component';

describe('Component Tests', () => {
  describe('TypeBovin Management Update Component', () => {
    let comp: TypeBovinUpdateComponent;
    let fixture: ComponentFixture<TypeBovinUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let typeBovinService: TypeBovinService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TypeBovinUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TypeBovinUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeBovinUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      typeBovinService = TestBed.inject(TypeBovinService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const typeBovin: ITypeBovin = { id: 456 };

        activatedRoute.data = of({ typeBovin });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(typeBovin));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const typeBovin = { id: 123 };
        spyOn(typeBovinService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ typeBovin });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: typeBovin }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(typeBovinService.update).toHaveBeenCalledWith(typeBovin);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const typeBovin = new TypeBovin();
        spyOn(typeBovinService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ typeBovin });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: typeBovin }));
        saveSubject.complete();

        // THEN
        expect(typeBovinService.create).toHaveBeenCalledWith(typeBovin);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const typeBovin = { id: 123 };
        spyOn(typeBovinService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ typeBovin });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(typeBovinService.update).toHaveBeenCalledWith(typeBovin);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
