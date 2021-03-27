import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TraitementDetailComponent } from './traitement-detail.component';

describe('Component Tests', () => {
  describe('Traitement Management Detail Component', () => {
    let comp: TraitementDetailComponent;
    let fixture: ComponentFixture<TraitementDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TraitementDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ traitement: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TraitementDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TraitementDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load traitement on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.traitement).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
