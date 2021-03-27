jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IRace, Race } from '../race.model';
import { RaceService } from '../service/race.service';

import { RaceRoutingResolveService } from './race-routing-resolve.service';

describe('Service Tests', () => {
  describe('Race routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: RaceRoutingResolveService;
    let service: RaceService;
    let resultRace: IRace | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(RaceRoutingResolveService);
      service = TestBed.inject(RaceService);
      resultRace = undefined;
    });

    describe('resolve', () => {
      it('should return IRace returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultRace = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultRace).toEqual({ id: 123 });
      });

      it('should return new IRace if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultRace = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultRace).toEqual(new Race());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultRace = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultRace).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
