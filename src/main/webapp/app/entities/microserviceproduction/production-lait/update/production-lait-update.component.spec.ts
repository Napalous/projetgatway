jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ProductionLaitService } from '../service/production-lait.service';
import { IProductionLait, ProductionLait } from '../production-lait.model';

import { ProductionLaitUpdateComponent } from './production-lait-update.component';

describe('Component Tests', () => {
  describe('ProductionLait Management Update Component', () => {
    let comp: ProductionLaitUpdateComponent;
    let fixture: ComponentFixture<ProductionLaitUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let productionLaitService: ProductionLaitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProductionLaitUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ProductionLaitUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductionLaitUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      productionLaitService = TestBed.inject(ProductionLaitService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const productionLait: IProductionLait = { id: 456 };

        activatedRoute.data = of({ productionLait });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(productionLait));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const productionLait = { id: 123 };
        spyOn(productionLaitService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ productionLait });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: productionLait }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(productionLaitService.update).toHaveBeenCalledWith(productionLait);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const productionLait = new ProductionLait();
        spyOn(productionLaitService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ productionLait });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: productionLait }));
        saveSubject.complete();

        // THEN
        expect(productionLaitService.create).toHaveBeenCalledWith(productionLait);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const productionLait = { id: 123 };
        spyOn(productionLaitService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ productionLait });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(productionLaitService.update).toHaveBeenCalledWith(productionLait);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
