import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFicheMedical, FicheMedical } from '../fiche-medical.model';

import { FicheMedicalService } from './fiche-medical.service';

describe('Service Tests', () => {
  describe('FicheMedical Service', () => {
    let service: FicheMedicalService;
    let httpMock: HttpTestingController;
    let elemDefault: IFicheMedical;
    let expectedResult: IFicheMedical | IFicheMedical[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(FicheMedicalService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        observation: 'AAAAAAA',
        dateconsultation: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateconsultation: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a FicheMedical', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateconsultation: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateconsultation: currentDate,
          },
          returnedFromService
        );

        service.create(new FicheMedical()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a FicheMedical', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            observation: 'BBBBBB',
            dateconsultation: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateconsultation: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a FicheMedical', () => {
        const patchObject = Object.assign({}, new FicheMedical());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateconsultation: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of FicheMedical', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            observation: 'BBBBBB',
            dateconsultation: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateconsultation: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a FicheMedical', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addFicheMedicalToCollectionIfMissing', () => {
        it('should add a FicheMedical to an empty array', () => {
          const ficheMedical: IFicheMedical = { id: 123 };
          expectedResult = service.addFicheMedicalToCollectionIfMissing([], ficheMedical);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(ficheMedical);
        });

        it('should not add a FicheMedical to an array that contains it', () => {
          const ficheMedical: IFicheMedical = { id: 123 };
          const ficheMedicalCollection: IFicheMedical[] = [
            {
              ...ficheMedical,
            },
            { id: 456 },
          ];
          expectedResult = service.addFicheMedicalToCollectionIfMissing(ficheMedicalCollection, ficheMedical);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a FicheMedical to an array that doesn't contain it", () => {
          const ficheMedical: IFicheMedical = { id: 123 };
          const ficheMedicalCollection: IFicheMedical[] = [{ id: 456 }];
          expectedResult = service.addFicheMedicalToCollectionIfMissing(ficheMedicalCollection, ficheMedical);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(ficheMedical);
        });

        it('should add only unique FicheMedical to an array', () => {
          const ficheMedicalArray: IFicheMedical[] = [{ id: 123 }, { id: 456 }, { id: 92644 }];
          const ficheMedicalCollection: IFicheMedical[] = [{ id: 123 }];
          expectedResult = service.addFicheMedicalToCollectionIfMissing(ficheMedicalCollection, ...ficheMedicalArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const ficheMedical: IFicheMedical = { id: 123 };
          const ficheMedical2: IFicheMedical = { id: 456 };
          expectedResult = service.addFicheMedicalToCollectionIfMissing([], ficheMedical, ficheMedical2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(ficheMedical);
          expect(expectedResult).toContain(ficheMedical2);
        });

        it('should accept null and undefined values', () => {
          const ficheMedical: IFicheMedical = { id: 123 };
          expectedResult = service.addFicheMedicalToCollectionIfMissing([], null, ficheMedical, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(ficheMedical);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
