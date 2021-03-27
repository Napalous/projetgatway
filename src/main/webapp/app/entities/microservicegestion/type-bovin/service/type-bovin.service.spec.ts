import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITypeBovin, TypeBovin } from '../type-bovin.model';

import { TypeBovinService } from './type-bovin.service';

describe('Service Tests', () => {
  describe('TypeBovin Service', () => {
    let service: TypeBovinService;
    let httpMock: HttpTestingController;
    let elemDefault: ITypeBovin;
    let expectedResult: ITypeBovin | ITypeBovin[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TypeBovinService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        libelle: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TypeBovin', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TypeBovin()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TypeBovin', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            libelle: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TypeBovin', () => {
        const patchObject = Object.assign({}, new TypeBovin());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TypeBovin', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            libelle: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TypeBovin', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTypeBovinToCollectionIfMissing', () => {
        it('should add a TypeBovin to an empty array', () => {
          const typeBovin: ITypeBovin = { id: 123 };
          expectedResult = service.addTypeBovinToCollectionIfMissing([], typeBovin);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(typeBovin);
        });

        it('should not add a TypeBovin to an array that contains it', () => {
          const typeBovin: ITypeBovin = { id: 123 };
          const typeBovinCollection: ITypeBovin[] = [
            {
              ...typeBovin,
            },
            { id: 456 },
          ];
          expectedResult = service.addTypeBovinToCollectionIfMissing(typeBovinCollection, typeBovin);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TypeBovin to an array that doesn't contain it", () => {
          const typeBovin: ITypeBovin = { id: 123 };
          const typeBovinCollection: ITypeBovin[] = [{ id: 456 }];
          expectedResult = service.addTypeBovinToCollectionIfMissing(typeBovinCollection, typeBovin);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(typeBovin);
        });

        it('should add only unique TypeBovin to an array', () => {
          const typeBovinArray: ITypeBovin[] = [{ id: 123 }, { id: 456 }, { id: 17933 }];
          const typeBovinCollection: ITypeBovin[] = [{ id: 123 }];
          expectedResult = service.addTypeBovinToCollectionIfMissing(typeBovinCollection, ...typeBovinArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const typeBovin: ITypeBovin = { id: 123 };
          const typeBovin2: ITypeBovin = { id: 456 };
          expectedResult = service.addTypeBovinToCollectionIfMissing([], typeBovin, typeBovin2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(typeBovin);
          expect(expectedResult).toContain(typeBovin2);
        });

        it('should accept null and undefined values', () => {
          const typeBovin: ITypeBovin = { id: 123 };
          expectedResult = service.addTypeBovinToCollectionIfMissing([], null, typeBovin, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(typeBovin);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
