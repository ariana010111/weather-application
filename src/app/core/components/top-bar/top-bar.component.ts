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

      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          url: ''
        },
        {
          label:  'Weather',
          icon: 'pi pi-fw pi-sun',
          url: '/weather'
        },
        {
          label: 'Setting',
          icon: 'pi pi-fw pi-cog',
          url: '/setting'
        }
      ];


  }
}
