import {Component, OnInit} from '@angular/core';
import {MegaMenuItem} from "primeng/api";
import { TranslocoService} from "@ngneat/transloco";
import {filter} from "rxjs";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  constructor(private translateService: TranslocoService) {
  }
items: MegaMenuItem[] | undefined;

  ngOnInit() {
    this.translateService.load('en').subscribe();
    this.translateService.events$.pipe(filter(event => event.type === 'translationLoadSuccess')).subscribe(() =>{
      this.items = [
        {
          label: this.translateService.translate('bundleID_literal_home'),
          icon: 'pi pi-fw pi-home',
          url: ''
        },
        {
          label:  this.translateService.translate('bundleID_literal_weather'),
          icon: 'pi pi-fw pi-sun',
          url: '/weather'
        },
        {
          label: this.translateService.translate('bundleID_literal_setting'),
          icon: 'pi pi-fw pi-cog',
          url: '/setting'
        }
      ];
    })

  }
}
