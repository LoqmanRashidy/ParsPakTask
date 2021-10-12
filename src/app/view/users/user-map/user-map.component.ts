import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import * as L from 'leaflet';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.scss']
})
export class UserMapComponent implements OnInit,AfterViewInit {

  public map:any;
  public marker : any;
  @Input() lat: number=0;
  @Input() lng: number=0;
  @Input() title: string="";
  constructor(private modal: NzModalRef) {}

  destroyModal(): void {
    this.modal.destroy();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  
  private initMap(): void {
    this.map =new L.Map('map', {
      zoomControl: true,
      center: [this.lat,this.lng],
      zoom: 3,
    });

      
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });
     tiles.addTo(this.map);

    this.marker = new L.Marker([this.lat,this.lng]).addTo(this.map);
    this.marker.bindPopup(this.title).openPopup();

  }



}
