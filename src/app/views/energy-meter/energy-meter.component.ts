import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-energy-meter',
  templateUrl: './energy-meter.component.html',
  styleUrls: ['./energy-meter.component.scss']
})
export class EnergyMeterComponent implements OnInit {
  energyMeters: any[] = [];

  ngOnInit(): void {
    
  }
}
