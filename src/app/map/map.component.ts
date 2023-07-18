import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map: google.maps.Map | undefined;
  selectedLocation!: string;
  markers: google.maps.Marker[] = [];

  ngAfterViewInit() {
    this.initializeMap();
  }

  initializeMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 51.5074, lng: -0.1278 },
      zoom: 10
    };
    const mapElement = document.getElementById('map');
    if (mapElement) {
      this.map = new google.maps.Map(mapElement, mapOptions);
    }
  }

  onLocationChange() {
    if (this.map && this.selectedLocation) {
      this.clearMarkers();
  
      let coordinates: google.maps.LatLngLiteral | undefined;
  
      if (this.selectedLocation === 'delhi') {
        coordinates = { lat: 28.7041, lng: 77.1025 };
      } else if (this.selectedLocation === 'mumbai') {
        coordinates = { lat: 19.0760, lng: 72.8777 };
      } else if (this.selectedLocation === 'kolkata') {
        coordinates = { lat: 22.5726, lng: 88.3639 };
      } else if (this.selectedLocation === 'chennai') {
        coordinates = { lat: 13.0827, lng: 80.2707 };
      } else if (this.selectedLocation === 'bengaluru') {
        coordinates = { lat: 12.9716, lng: 77.5946 };
      } else if (this.selectedLocation === 'hyderabad') {
        coordinates = { lat: 17.3850, lng: 78.4867 };
      } else if (this.selectedLocation === 'ahmedabad') {
        coordinates = { lat: 23.0225, lng: 72.5714 };
      } else if (this.selectedLocation === 'pune') {
        coordinates = { lat: 18.5204, lng: 73.8567 };
      } else if (this.selectedLocation === 'jaipur') {
        coordinates = { lat: 26.9124, lng: 75.7873 };
      } else if (this.selectedLocation === 'lucknow') {
        coordinates = { lat: 26.8467, lng: 80.9462 };
      }
  
      if (coordinates) {
        const marker = new google.maps.Marker({
          position: coordinates,
          map: this.map
        });
  
        this.map.setCenter(coordinates);
  
        this.markers.push(marker);
      }
    }
  }
  

  clearMarkers() {
    for (const marker of this.markers) {
      marker.setMap(null);
    }
    this.markers = [];
  }
}
