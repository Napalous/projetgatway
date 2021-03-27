jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITraitement, Traitement } from '../traitement.model';
import { TraitementService } from '../service/traitement.service';

import { TraitementRoutingResolveService } from './traitement-routing-resolve.service';

describe('Service Tests', () => {
  describe('Traitement routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TraitementRoutingResolveService;
    let service: TraitementService;
    let resultTraitement: ITraitement | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TraitementRoutingResolveService);
      service = TestBed.inject(TraitementService);
      resultTraitement = undefined;
    });

    describe('resolve', () => {
      it('should return ITraitement returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTraitement = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTraitement).toEqual({ id: 123 });
      });

      it('should return new ITraitement if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTraitement = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTraitement).toEqual(new Traitement());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTraitement = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTraitement).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
