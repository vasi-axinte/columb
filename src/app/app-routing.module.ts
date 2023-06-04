import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelDocsComponent } from './components/travel-docs/travel-docs.component';
import { VehicleInfoComponent } from './components/vehicle-info/vehicle-info.component';

const routes: Routes = [
  { path: 'travel-docs', component: TravelDocsComponent },
  { path: 'vehicle-info', component: VehicleInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
