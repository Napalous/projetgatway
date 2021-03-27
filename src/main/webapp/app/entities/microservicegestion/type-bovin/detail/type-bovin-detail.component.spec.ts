import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TypeBovinDetailComponent } from './type-bovin-detail.component';

describe('Component Tests', () => {
  describe('TypeBovin Management Detail Component', () => {
    let comp: TypeBovinDetailComponent;
    let fixture: ComponentFixture<TypeBovinDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TypeBovinDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ typeBovin: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TypeBovinDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TypeBovinDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load typeBovin on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.typeBovin).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
