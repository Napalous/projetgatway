jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IProductionLait, ProductionLait } from '../production-lait.model';
import { ProductionLaitService } from '../service/production-lait.service';

import { ProductionLaitRoutingResolveService } from './production-lait-routing-resolve.service';

describe('Service Tests', () => {
  describe('ProductionLait routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ProductionLaitRoutingResolveService;
    let service: ProductionLaitService;
    let resultProductionLait: IProductionLait | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ProductionLaitRoutingResolveService);
      service = TestBed.inject(ProductionLaitService);
      resultProductionLait = undefined;
    });

    describe('resolve', () => {
      it('should return IProductionLait returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultProductionLait = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultProductionLait).toEqual({ id: 123 });
      });

      it('should return new IProductionLait if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultProductionLait = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultProductionLait).toEqual(new ProductionLait());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultProductionLait = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultProductionLait).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
