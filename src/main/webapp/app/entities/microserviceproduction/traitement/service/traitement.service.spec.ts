import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITraitement, Traitement } from '../traitement.model';

import { TraitementService } from './traitement.service';

describe('Service Tests', () => {
  describe('Traitement Service', () => {
    let service: TraitementService;
    let httpMock: HttpTestingController;
    let elemDefault: ITraitement;
    let expectedResult: ITraitement | ITraitement[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TraitementService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        traitement: 'AAAAAAA',
        datetraitement: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            datetraitement: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Traitement', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            datetraitement: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datetraitement: currentDate,
          },
          returnedFromService
        );

        service.create(new Traitement()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Traitement', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            traitement: 'BBBBBB',
            datetraitement: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datetraitement: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Traitement', () => {
        const patchObject = Object.assign(
          {
            datetraitement: currentDate.format(DATE_TIME_FORMAT),
          },
          new Traitement()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            datetraitement: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Traitement', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            traitement: 'BBBBBB',
            datetraitement: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datetraitement: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Traitement', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTraitementToCollectionIfMissing', () => {
        it('should add a Traitement to an empty array', () => {
          const traitement: ITraitement = { id: 123 };
          expectedResult = service.addTraitementToCollectionIfMissing([], traitement);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(traitement);
        });

        it('should not add a Traitement to an array that contains it', () => {
          const traitement: ITraitement = { id: 123 };
          const traitementCollection: ITraitement[] = [
            {
              ...traitement,
            },
            { id: 456 },
          ];
          expectedResult = service.addTraitementToCollectionIfMissing(traitementCollection, traitement);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Traitement to an array that doesn't contain it", () => {
          const traitement: ITraitement = { id: 123 };
          const traitementCollection: ITraitement[] = [{ id: 456 }];
          expectedResult = service.addTraitementToCollectionIfMissing(traitementCollection, traitement);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(traitement);
        });

        it('should add only unique Traitement to an array', () => {
          const traitementArray: ITraitement[] = [{ id: 123 }, { id: 456 }, { id: 16607 }];
          const traitementCollection: ITraitement[] = [{ id: 123 }];
          expectedResult = service.addTraitementToCollectionIfMissing(traitementCollection, ...traitementArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const traitement: ITraitement = { id: 123 };
          const traitement2: ITraitement = { id: 456 };
          expectedResult = service.addTraitementToCollectionIfMissing([], traitement, traitement2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(traitement);
          expect(expectedResult).toContain(traitement2);
        });

        it('should accept null and undefined values', () => {
          const traitement: ITraitement = { id: 123 };
          expectedResult = service.addTraitementToCollectionIfMissing([], null, traitement, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(traitement);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
