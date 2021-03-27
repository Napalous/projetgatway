import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'bovin',
        data: { pageTitle: 'projetgatewayApp.microservicegestionBovin.home.title' },
        loadChildren: () => import('./microservicegestion/bovin/bovin.module').then(m => m.MicroservicegestionBovinModule),
      },
      {
        path: 'fiche-medical',
        data: { pageTitle: 'projetgatewayApp.microserviceproductionFicheMedical.home.title' },
        loadChildren: () =>
          import('./microserviceproduction/fiche-medical/fiche-medical.module').then(m => m.MicroserviceproductionFicheMedicalModule),
      },
      {
        path: 'production-lait',
        data: { pageTitle: 'projetgatewayApp.microserviceproductionProductionLait.home.title' },
        loadChildren: () =>
          import('./microserviceproduction/production-lait/production-lait.module').then(m => m.MicroserviceproductionProductionLaitModule),
      },
      {
        path: 'race',
        data: { pageTitle: 'projetgatewayApp.microservicegestionRace.home.title' },
        loadChildren: () => import('./microservicegestion/race/race.module').then(m => m.MicroservicegestionRaceModule),
      },
      {
        path: 'traitement',
        data: { pageTitle: 'projetgatewayApp.microserviceproductionTraitement.home.title' },
        loadChildren: () =>
          import('./microserviceproduction/traitement/traitement.module').then(m => m.MicroserviceproductionTraitementModule),
      },
      {
        path: 'type-bovin',
        data: { pageTitle: 'projetgatewayApp.microservicegestionTypeBovin.home.title' },
        loadChildren: () => import('./microservicegestion/type-bovin/type-bovin.module').then(m => m.MicroservicegestionTypeBovinModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
