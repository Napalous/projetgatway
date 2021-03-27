import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BovinDetailComponent } from './bovin-detail.component';

describe('Component Tests', () => {
  describe('Bovin Management Detail Component', () => {
    let comp: BovinDetailComponent;
    let fixture: ComponentFixture<BovinDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [BovinDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ bovin: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(BovinDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BovinDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load bovin on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bovin).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
