import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  
  zoom = 14;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    disableDoubleClickZoom: true,
  }

  vehicles!: Vehicle[];
  selectedVehicle!: Vehicle | null;

  markerClustererImagePath =
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
isLoading: boolean = true;
  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })

    this.vehicleService.vehiclesList.subscribe(res => {
      this.vehicles = res;
      this.isLoading = false;
    })

    this.vehicleService.selectedVehicle.subscribe(res => {
      this.selectedVehicle = res;
      //Wycentrowanie obrazu dla wybranego pojazdu
      if(res) {
        this.center = {
          lat: res.position.lat,
          lng: res.position.lng
        }
        this.zoom = 19;
      }
    })
  }

  selectVehicle(vehicle: Vehicle) {
    this.vehicleService.selectVehicle(vehicle);
  }
}
