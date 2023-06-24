import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelDocsComponent } from './components/travel-docs/travel-docs.component';
import { VehicleInfoComponent } from './components/vehicle-info/vehicle-info.component';
import { TechnicalCheckComponent } from './components/technical-check/technical-check.component';
import { DrivingLicenseComponent } from './components/driving-license/driving-license.component';
import { VehicleInsuranceComponent } from './components/vehicle-insurance/vehicle-insurance.component';
import { SanctionsComponent } from './components/sanctions/sanctions.component';
import { SpecimensComponent } from './components/specimens/specimens.component';
import { UsefulSitesComponent } from './components/useful-sites/useful-sites.component';
import { HomeComponent } from './components/home/home.component';
import { PdfViewComponent } from './components/pdf-view/pdf-view.component';
import { SanctionDetailsComponent } from './components/sanction-details/sanction-details.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { CrimesComponent } from './components/crimes/crimes.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { RoleEnum } from './models/role.enum';
import { TiafComponent } from './components/tiaf/tiaf.component';
import { CrimesDetailsComponent } from './components/crimes-details/crimes-details.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordEmailComponent } from './components/reset-password-email/reset-password-email.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'travel-docs', component: TravelDocsComponent, canActivate: [AuthGuard] },
  { path: 'vehicle-info', component: VehicleInfoComponent, canActivate: [AuthGuard] },
  { path: 'technical-check', component: TechnicalCheckComponent, canActivate: [AuthGuard] },
  { path: 'driving-license', component: DrivingLicenseComponent, canActivate: [AuthGuard] },
  { path: 'vehicle-insurance', component: VehicleInsuranceComponent, canActivate: [AuthGuard] },
  { path: 'sanctions', children: [
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
  { 
    path: 'crimes', children: [
    {
      path: '',
      component: CrimesComponent,
    },
    {
      path:'details/:contentId',
      component: CrimesDetailsComponent
    }], 
    canActivate: [AuthGuard] 
  },
  { path: 'specimens', component: SpecimensComponent, canActivate: [AuthGuard] },
  { path: 'tiaf', component: TiafComponent, canActivate: [AuthGuard] },
  { path: 'useful-sites', component: UsefulSitesComponent, canActivate: [AuthGuard] },
  { path: 'user-management', 
    component: UserManagementComponent, 
    canActivate: [AuthGuard], 
    data: {
      roles: [RoleEnum.Admin]
    }},
  { path: 'reset-password', children: [
    {
      path: '',
      component: ResetPasswordEmailComponent
    },
    {
      path: ':userId',
      component: ResetPasswordComponent 
    }

  ]},
  { path: 'update-user/:userId', component: UpdateUserComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
