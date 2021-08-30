import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  public vehiclesList: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>([]);

  constructor(private http: HttpClient) { }

  getAllVehicles() {
    return this.http.get<{objects: Vehicle[]}>(environment.apiUrl + '?objectType=VEHICLE').pipe(
      map(list => this.vehiclesList.next(list.objects))
    )
  }
}
