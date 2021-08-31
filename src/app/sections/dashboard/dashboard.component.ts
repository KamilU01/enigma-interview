import { Component, OnInit} from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  vehicles!: Vehicle[];
  selectedVehicle!: Vehicle | null;
  sortById!: number;
  showAvailable: boolean = false;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.filteredVehiclesList.subscribe(res => {
      this.vehicles = res;
    })

    this.vehicleService.selectedVehicle.subscribe(res => {
      this.selectedVehicle = res;
    })
  }

  selectVehicle(vehicle: Vehicle) {
    this.vehicleService.selectVehicle(vehicle);
  }

  filterAvailable() {
    this.showAvailable = !this.showAvailable;
    this.filterAndSort(this.sortById);
  }

  filterAndSort(sortBy: number) {
    this.sortById = sortBy;
    this.vehicleService.filterAndSort(sortBy, this.showAvailable);
  }

  showPopout(vehicle: Vehicle) {
    this.vehicleService.showPopout(vehicle);
  }
}
