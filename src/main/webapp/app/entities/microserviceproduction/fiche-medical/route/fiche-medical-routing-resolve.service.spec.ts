jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IFicheMedical, FicheMedical } from '../fiche-medical.model';
import { FicheMedicalService } from '../service/fiche-medical.service';

import { FicheMedicalRoutingResolveService } from './fiche-medical-routing-resolve.service';

describe('Service Tests', () => {
  describe('FicheMedical routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: FicheMedicalRoutingResolveService;
    let service: FicheMedicalService;
    let resultFicheMedical: IFicheMedical | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(FicheMedicalRoutingResolveService);
      service = TestBed.inject(FicheMedicalService);
      resultFicheMedical = undefined;
    });

    describe('resolve', () => {
      it('should return IFicheMedical returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultFicheMedical = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultFicheMedical).toEqual({ id: 123 });
      });

      it('should return new IFicheMedical if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultFicheMedical = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultFicheMedical).toEqual(new FicheMedical());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultFicheMedical = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultFicheMedical).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
