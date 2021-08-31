import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule, MapMarkerClusterer } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MapComponent } from './sections/map/map.component';
import { DashboardComponent } from './sections/dashboard/dashboard.component';
import { AlertModule } from './services/alert/alert.module';
import { VehicleComponent } from './sections/vehicle/vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MapComponent,
    VehicleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    AlertModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
