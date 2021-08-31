import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  public vehiclesList: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>([]);
  public selectedVehicle: BehaviorSubject<Vehicle | null> = new BehaviorSubject<Vehicle | null>(null);

  constructor(private http: HttpClient) { }

  getAllVehicles() {
    return this.http.get<{ objects: Vehicle[] }>(environment.apiUrl + '?objectType=VEHICLE').pipe(
      map(res => {
        //Dostosowanie otrzymanej odpowiedzi do wymagań Google Maps
        res.objects.forEach(vehicle => {
          let lat = vehicle.location.latitude;
          let lng = vehicle.location.longitude;

          let position = { position: { lat, lng } };

          Object.assign(vehicle, position);
        });

        this.vehiclesList.next(res.objects);
      })
    )
  }

  selectVehicle(vehicle: Vehicle) {
    this.selectedVehicle.next(vehicle);
  }
}
