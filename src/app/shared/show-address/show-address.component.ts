import {Component, Input, OnInit} from '@angular/core';
import {IAddress} from '@core/models/address';

@Component({
  selector: 'app-show-address',
  templateUrl: './show-address.component.html',
  styleUrls: ['./show-address.component.scss']
})
export class ShowAddressComponent implements OnInit {

  @Input() address: IAddress;
  constructor() { }

  ngOnInit(): void {
  }

}
