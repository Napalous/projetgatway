import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRace, Race } from '../race.model';

import { RaceService } from './race.service';

describe('Service Tests', () => {
  describe('Race Service', () => {
    let service: RaceService;
    let httpMock: HttpTestingController;
    let elemDefault: IRace;
    let expectedResult: IRace | IRace[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(RaceService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        libelle: 'AAAAAAA',
        imageContentType: 'image/png',
        image: 'AAAAAAA',
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

      it('should create a Race', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Race()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Race', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            libelle: 'BBBBBB',
            image: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Race', () => {
        const patchObject = Object.assign(
          {
            libelle: 'BBBBBB',
            image: 'BBBBBB',
          },
          new Race()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Race', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            libelle: 'BBBBBB',
            image: 'BBBBBB',
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

      it('should delete a Race', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addRaceToCollectionIfMissing', () => {
        it('should add a Race to an empty array', () => {
          const race: IRace = { id: 123 };
          expectedResult = service.addRaceToCollectionIfMissing([], race);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(race);
        });

        it('should not add a Race to an array that contains it', () => {
          const race: IRace = { id: 123 };
          const raceCollection: IRace[] = [
            {
              ...race,
            },
            { id: 456 },
          ];
          expectedResult = service.addRaceToCollectionIfMissing(raceCollection, race);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Race to an array that doesn't contain it", () => {
          const race: IRace = { id: 123 };
          const raceCollection: IRace[] = [{ id: 456 }];
          expectedResult = service.addRaceToCollectionIfMissing(raceCollection, race);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(race);
        });

        it('should add only unique Race to an array', () => {
          const raceArray: IRace[] = [{ id: 123 }, { id: 456 }, { id: 38454 }];
          const raceCollection: IRace[] = [{ id: 123 }];
          expectedResult = service.addRaceToCollectionIfMissing(raceCollection, ...raceArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const race: IRace = { id: 123 };
          const race2: IRace = { id: 456 };
          expectedResult = service.addRaceToCollectionIfMissing([], race, race2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(race);
          expect(expectedResult).toContain(race2);
        });

        it('should accept null and undefined values', () => {
          const race: IRace = { id: 123 };
          expectedResult = service.addRaceToCollectionIfMissing([], null, race, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(race);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
