import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  isLoading: boolean = true;

  popoutVehicle!: Vehicle;

  constructor(private vehicleService: VehicleService, private alertService: AlertService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe(res => {
      this.isLoading = false;
    }, err => {
      this.alertService.error('Przepraszamy, wystąpił błąd :( Prosimy spróbować później.');
    })

    this.vehicleService.popoutVehicle.subscribe(res => {
      if(res) this.popoutVehicle = res;
    })
  }
}
