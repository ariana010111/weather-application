import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {translate, TranslocoService} from "@ngneat/transloco";
import {SourceStorageService} from "./core/services/source-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather-ng-app';

  constructor(private primengConfig: PrimeNGConfig,

             ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }


}
