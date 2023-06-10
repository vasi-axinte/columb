import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from "src/environments/environment";

import { CreateUserComponent } from './components/create-user/create-user.component';
import { MenuComponent } from './components/menu/menu.component';
import { TravelDocsComponent } from './components/travel-docs/travel-docs.component';
import { VehicleInfoComponent } from './components/vehicle-info/vehicle-info.component';
import { TechnicalCheckComponent } from './components/technical-check/technical-check.component';
import { DrivingLicenseComponent } from './components/driving-license/driving-license.component';
import { VehicleInsuranceComponent } from './components/vehicle-insurance/vehicle-insurance.component';
import { SanctionsComponent } from './components/sanctions/sanctions.component';
import { GlossasryComponent } from './components/glossasry/glossasry.component';
import { SpecimensComponent } from './components/specimens/specimens.component';
import { UsefulSitesComponent } from './components/useful-sites/useful-sites.component';
import { CountryNavigationComponent } from './components/country-navigation/country-navigation.component';  
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViewComponent } from './components/pdf-view/pdf-view.component';
import { SanctionDetailsComponent } from './components/sanction-details/sanction-details.component';
import { TranslocoRootModule } from './transloco-root.module';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { UrlNavigationComponent } from './components/url-navigation/url-navigation.component';
import { TokenInterceptor } from './services/token.interceptor';
import { AuthenticationClient } from './services/authentication.client';
import { CrimesComponent } from './components/crimes/crimes.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    MenuComponent,
    TravelDocsComponent,
    VehicleInfoComponent,
    TechnicalCheckComponent,
    DrivingLicenseComponent,
    VehicleInsuranceComponent,
    SanctionsComponent,
    GlossasryComponent,
    SpecimensComponent,
    UsefulSitesComponent,
    CountryNavigationComponent,
    HomeComponent,
    PdfViewComponent,
    SanctionDetailsComponent,
    LanguageSelectorComponent,
    LoginComponent,
    UrlNavigationComponent,
    CrimesComponent,
    UserManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    TranslocoRootModule,
  ],
  providers: [AuthService, AuthenticationClient, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
