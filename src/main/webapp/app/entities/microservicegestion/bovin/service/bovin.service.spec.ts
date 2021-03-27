import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IBovin, Bovin } from '../bovin.model';

import { BovinService } from './bovin.service';

describe('Service Tests', () => {
  describe('Bovin Service', () => {
    let service: BovinService;
    let httpMock: HttpTestingController;
    let elemDefault: IBovin;
    let expectedResult: IBovin | IBovin[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(BovinService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        numero: 'AAAAAAA',
        sexe: 'AAAAAAA',
        datenaissance: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            datenaissance: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Bovin', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            datenaissance: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datenaissance: currentDate,
          },
          returnedFromService
        );

        service.create(new Bovin()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Bovin', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            numero: 'BBBBBB',
            sexe: 'BBBBBB',
            datenaissance: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datenaissance: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Bovin', () => {
        const patchObject = Object.assign(
          {
            sexe: 'BBBBBB',
            datenaissance: currentDate.format(DATE_TIME_FORMAT),
          },
          new Bovin()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            datenaissance: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Bovin', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            numero: 'BBBBBB',
            sexe: 'BBBBBB',
            datenaissance: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datenaissance: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Bovin', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addBovinToCollectionIfMissing', () => {
        it('should add a Bovin to an empty array', () => {
          const bovin: IBovin = { id: 123 };
          expectedResult = service.addBovinToCollectionIfMissing([], bovin);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(bovin);
        });

        it('should not add a Bovin to an array that contains it', () => {
          const bovin: IBovin = { id: 123 };
          const bovinCollection: IBovin[] = [
            {
              ...bovin,
            },
            { id: 456 },
          ];
          expectedResult = service.addBovinToCollectionIfMissing(bovinCollection, bovin);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Bovin to an array that doesn't contain it", () => {
          const bovin: IBovin = { id: 123 };
          const bovinCollection: IBovin[] = [{ id: 456 }];
          expectedResult = service.addBovinToCollectionIfMissing(bovinCollection, bovin);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(bovin);
        });

        it('should add only unique Bovin to an array', () => {
          const bovinArray: IBovin[] = [{ id: 123 }, { id: 456 }, { id: 83072 }];
          const bovinCollection: IBovin[] = [{ id: 123 }];
          expectedResult = service.addBovinToCollectionIfMissing(bovinCollection, ...bovinArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const bovin: IBovin = { id: 123 };
          const bovin2: IBovin = { id: 456 };
          expectedResult = service.addBovinToCollectionIfMissing([], bovin, bovin2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(bovin);
          expect(expectedResult).toContain(bovin2);
        });

        it('should accept null and undefined values', () => {
          const bovin: IBovin = { id: 123 };
          expectedResult = service.addBovinToCollectionIfMissing([], null, bovin, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(bovin);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
