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
      //Dostosowanie otrzymanej odpowiedzi do wymagań Google Maps
      res.forEach(vehicle => {
        let lat = vehicle.location.latitude;
        let lng = vehicle.location.longitude;

        let position = {position: {lat, lng}};

        Object.assign(vehicle, position);
      });
      this.vehicles = res;
      this.isLoading = false;
    })
  }

}
