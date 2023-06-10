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
import { HomeComponent } from './components/home/home.component';
import { PdfViewComponent } from './components/pdf-view/pdf-view.component';
import { SanctionDetailsComponent } from './components/sanction-details/sanction-details.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { CrimesComponent } from './components/crimes/crimes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'travel-docs', component: TravelDocsComponent, canActivate: [AuthGuard] },
  { path: 'vehicle-info', component: VehicleInfoComponent, canActivate: [AuthGuard] },
  { path: 'technical-check', component: TechnicalCheckComponent, canActivate: [AuthGuard] },
  { path: 'driving-license', component: DrivingLicenseComponent, canActivate: [AuthGuard] },
  { path: 'vehicle-insurance', component: VehicleInsuranceComponent, canActivate: [AuthGuard] },
  {
    path: 'sanctions', children: [
      {
        path: '',
        component: SanctionsComponent
      },
      {
        path: 'oug-97',
        component: PdfViewComponent
      },
      {
        path: 'details/:contentId',
        component: SanctionDetailsComponent
      }],
      canActivate: [AuthGuard]
  },
  { path: 'crimes', component: CrimesComponent, canActivate: [AuthGuard] },
  { path: 'glossary', component: GlossasryComponent, canActivate: [AuthGuard] },
  { path: 'specimens', component: SpecimensComponent, canActivate: [AuthGuard] },
  { path: 'useful-sites', component: UsefulSitesComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
