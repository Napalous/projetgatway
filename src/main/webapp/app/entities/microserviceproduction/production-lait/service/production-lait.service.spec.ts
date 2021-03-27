import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IProductionLait, ProductionLait } from '../production-lait.model';

import { ProductionLaitService } from './production-lait.service';

describe('Service Tests', () => {
  describe('ProductionLait Service', () => {
    let service: ProductionLaitService;
    let httpMock: HttpTestingController;
    let elemDefault: IProductionLait;
    let expectedResult: IProductionLait | IProductionLait[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ProductionLaitService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        quantite: 0,
        dateproduction: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateproduction: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ProductionLait', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateproduction: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateproduction: currentDate,
          },
          returnedFromService
        );

        service.create(new ProductionLait()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ProductionLait', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            quantite: 1,
            dateproduction: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateproduction: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a ProductionLait', () => {
        const patchObject = Object.assign(
          {
            quantite: 1,
            dateproduction: currentDate.format(DATE_TIME_FORMAT),
          },
          new ProductionLait()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateproduction: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ProductionLait', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            quantite: 1,
            dateproduction: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateproduction: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ProductionLait', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addProductionLaitToCollectionIfMissing', () => {
        it('should add a ProductionLait to an empty array', () => {
          const productionLait: IProductionLait = { id: 123 };
          expectedResult = service.addProductionLaitToCollectionIfMissing([], productionLait);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(productionLait);
        });

        it('should not add a ProductionLait to an array that contains it', () => {
          const productionLait: IProductionLait = { id: 123 };
          const productionLaitCollection: IProductionLait[] = [
            {
              ...productionLait,
            },
            { id: 456 },
          ];
          expectedResult = service.addProductionLaitToCollectionIfMissing(productionLaitCollection, productionLait);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ProductionLait to an array that doesn't contain it", () => {
          const productionLait: IProductionLait = { id: 123 };
          const productionLaitCollection: IProductionLait[] = [{ id: 456 }];
          expectedResult = service.addProductionLaitToCollectionIfMissing(productionLaitCollection, productionLait);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(productionLait);
        });

        it('should add only unique ProductionLait to an array', () => {
          const productionLaitArray: IProductionLait[] = [{ id: 123 }, { id: 456 }, { id: 26538 }];
          const productionLaitCollection: IProductionLait[] = [{ id: 123 }];
          expectedResult = service.addProductionLaitToCollectionIfMissing(productionLaitCollection, ...productionLaitArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const productionLait: IProductionLait = { id: 123 };
          const productionLait2: IProductionLait = { id: 456 };
          expectedResult = service.addProductionLaitToCollectionIfMissing([], productionLait, productionLait2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(productionLait);
          expect(expectedResult).toContain(productionLait2);
        });

        it('should accept null and undefined values', () => {
          const productionLait: IProductionLait = { id: 123 };
          expectedResult = service.addProductionLaitToCollectionIfMissing([], null, productionLait, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(productionLait);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
