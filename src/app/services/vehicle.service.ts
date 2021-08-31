import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Vehicle, VehicleStatus } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  vehiclesList!: Vehicle[];
  public filteredVehiclesList: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>([]);
  public selectedVehicle: BehaviorSubject<Vehicle | null> = new BehaviorSubject<Vehicle | null>(null);
  public popoutVehicle: BehaviorSubject<Vehicle | null> = new BehaviorSubject<Vehicle | null>(null);

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
        this.vehiclesList = res.objects;
        this.filteredVehiclesList.next(res.objects);
      })
    )
  }

  selectVehicle(vehicle: Vehicle) {
    this.selectedVehicle.next(vehicle);
  }

  /*
    Sortowanie: 
    - 1-bateria rosnąco

    Filtrowanie:
    - true-pokaz dostepne samochody
  */

  filterAndSort(sortBy: number, filterAvailable: boolean) {
    let vehicles = this.vehiclesList;

    if (filterAvailable == true) {
      vehicles = vehicles.filter(vehicle => { return vehicle.status === VehicleStatus.AVAILABLE })
    }

    switch (sortBy) {
      case 1:
        vehicles.sort((a, b) => b.batteryLevelPct - a.batteryLevelPct);
        break;
    }

    this.filteredVehiclesList.next(vehicles);
  }

  showPopout(vehicle: Vehicle) {
    this.popoutVehicle.next(vehicle);
  }
}
