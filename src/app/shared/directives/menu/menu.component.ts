import {AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() items: MenuItem[];
  list: string;
  menuList: MenuItem[];
  navList: MenuItem[];
  moreList: MenuItem[];
  @ViewChild('scrollmenu') elementMenu: ElementRef;

  constructor() {
  }

  ngAfterViewInit(): void {
    // this.listContoroller();
  }

  ngOnChanges(): void {
    this.items = this.items.filter(x => x.visible);
  }

  ngOnInit(): void {
  }


  @HostListener('window:resize', ['$event.target'])
  setToolTip(): void {
    // this.listContoroller();
  }

  listContoroller(): void {
    let lastElement;
    const width = document.getElementById('scrollmenu').offsetWidth;
    const scrollWidth = document.getElementById('scrollmenu').scrollWidth;
    // console.log('offsetWidth', width);
    // console.log('scrollWidth', scrollWidth);
    if (width < scrollWidth) {

      lastElement = this.menuList.pop();
      console.log('menuList', this.items);
    } else {
    }
  }

  /*  @HostListener('window:resize', ['$event'])
    onResize($event?): void {
      this.innerWidth = window.innerWidth;
      let menuList = this.items;
      let lastElement;
      if (this.innerWidth > 730) {
        menuList = this.items;
      } else if (this.innerWidth < 730 && this.innerWidth > 710) {
        lastElement = menuList.pop();
        this.list.push(lastElement)

        // this.removeList = menuList.slice(0, 4);
      } else if (this.innerWidth < 710 && this.innerWidth > 550) {
        lastElement = menuList.pop();
        this.list.push(lastElement)
        // this.removeList = menuList.slice(0, 3);
      } else if (this.innerWidth < 550 && this.innerWidth > 420) {
        lastElement = menuList.pop();
        this.list.push(lastElement)
        // this.removeList = menuList.slice(0, 2);
      } else if (this.innerWidth < 420) {
        menuList = [];
        menuList.push(this.items[0]);
        this.list = this.items;
        // this.removeList = menuList.slice(0, 1);
      }
      console.log('menuList', menuList)
      this.removeList = menuList;
    }*/

}
