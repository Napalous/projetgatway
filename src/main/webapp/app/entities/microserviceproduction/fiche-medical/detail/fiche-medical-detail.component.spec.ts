import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FicheMedicalDetailComponent } from './fiche-medical-detail.component';

describe('Component Tests', () => {
  describe('FicheMedical Management Detail Component', () => {
    let comp: FicheMedicalDetailComponent;
    let fixture: ComponentFixture<FicheMedicalDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [FicheMedicalDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ ficheMedical: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(FicheMedicalDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FicheMedicalDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ficheMedical on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ficheMedical).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
