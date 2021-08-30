import { Component, OnInit } from '@angular/core';
import { Vehicle } from './models/vehicle.model';
import { AlertService } from './services/alert/alert.service';
import { VehicleService } from './services/vehicle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'enigma-interview';
  vehicles!: Vehicle[];
  constructor(private vehicleService: VehicleService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe(res => {
      this.vehicles = res.objects;
    }, err => {
      this.alertService.error('Przepraszamy, wystąpił błąd :( Prosimy spróbować później.');
    })
  }
}
