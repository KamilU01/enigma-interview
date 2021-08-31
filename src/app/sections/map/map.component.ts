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

  availableMarker = {
    path: "M0 0h24v24H0V0z M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z",
    fillColor: "#1ccf58",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  }

  unavailableMarker = {
    path: "M0 0h24v24H0V0z M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z",
    fillColor: "#dd2619",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  }

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })

    this.vehicleService.filteredVehiclesList.subscribe(res => {
      this.vehicles = res;
      this.isLoading = false;
    })

    this.vehicleService.selectedVehicle.subscribe(res => {
      this.selectedVehicle = res;
      //Wycentrowanie obrazu dla wybranego pojazdu
      if (res) {
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
