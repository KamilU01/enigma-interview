import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  vehicles!: Vehicle[];
  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.vehiclesList.subscribe(res => {
      this.vehicles = res;
    })
  }

}
