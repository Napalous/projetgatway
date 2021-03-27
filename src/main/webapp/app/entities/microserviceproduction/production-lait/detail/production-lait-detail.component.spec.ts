import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProductionLaitDetailComponent } from './production-lait-detail.component';

describe('Component Tests', () => {
  describe('ProductionLait Management Detail Component', () => {
    let comp: ProductionLaitDetailComponent;
    let fixture: ComponentFixture<ProductionLaitDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProductionLaitDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ productionLait: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ProductionLaitDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductionLaitDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productionLait on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productionLait).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
