import { Component, OnInit } from '@angular/core';
import { Vehicle } from './models/vehicle.model';
import { VehicleService } from './services/vehicle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'enigma-interview';
  vehicles!: Vehicle[];
  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe(res => {
      console.log(res)
    }, err => {
      
    })
  }
}
