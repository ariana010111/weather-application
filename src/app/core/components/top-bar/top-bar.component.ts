import {Component, OnInit} from '@angular/core';
import {MegaMenuItem} from "primeng/api";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
items: MegaMenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        url: ''
      },
      {
        label: 'Weather',
        icon: 'pi pi-fw pi-sun',
        url: '/weather'
      }
    ];
  }
}
