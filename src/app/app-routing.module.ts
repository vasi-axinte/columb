import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelDocsComponent } from './components/travel-docs/travel-docs.component';
import { VehicleInfoComponent } from './components/vehicle-info/vehicle-info.component';
import { TechnicalCheckComponent } from './components/technical-check/technical-check.component';
import { DrivingLicenseComponent } from './components/driving-license/driving-license.component';
import { VehicleInsuranceComponent } from './components/vehicle-insurance/vehicle-insurance.component';
import { SanctionsComponent } from './components/sanctions/sanctions.component';
import { GlossasryComponent } from './components/glossasry/glossasry.component';
import { SpecimensComponent } from './components/specimens/specimens.component';
import { UsefulSitesComponent } from './components/useful-sites/useful-sites.component';

const routes: Routes = [
  { path: 'travel-docs', component: TravelDocsComponent },
  { path: 'vehicle-info', component: VehicleInfoComponent },
  { path: 'technical-check', component: TechnicalCheckComponent },
  { path: 'driving-license', component: DrivingLicenseComponent },
  { path: 'vehicle-insurance', component: VehicleInsuranceComponent },
  { path: 'sanctions', component: SanctionsComponent },
  { path: 'glossary', component: GlossasryComponent },
  { path: 'specimens', component: SpecimensComponent },
  { path: 'useful-sites', component: UsefulSitesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
