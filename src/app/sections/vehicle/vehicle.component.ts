import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  @Input() popoutVehicle!: Vehicle;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
  }

  closePopout() {
    this.vehicleService.closePopout();
  }
}
