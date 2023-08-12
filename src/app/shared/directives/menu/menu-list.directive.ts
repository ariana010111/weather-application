import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  EventEmitter,
  Output,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Directive({
  selector: '[appMenuList]'
})
export class MenuListDirective implements OnInit, AfterViewInit {
  @Input() items: MenuItem[];
  @Output() navList: EventEmitter<MenuItem[]> = new EventEmitter(null);
  @Output() moreList: EventEmitter<MenuItem[]> = new EventEmitter(null);
  innerWidth: any;
  menuList: MenuItem[];
  navItemList: MenuItem[];
  moreItemList: MenuItem[] = [];
  private readonly domElement: HTMLElement;

  constructor(private elementRef: ElementRef,
              private ref: ChangeDetectorRef) {
    this.domElement = this.elementRef.nativeElement;

  }

  ngAfterViewInit(): void {
    this.listController();
    this.ref.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  setToolTip(): void {
    this.innerWidth = window.innerWidth;

    this.listController();
  }

  listController(): void {
    let popped;
    let width =  document.getElementById('scrollMenu').offsetWidth;
    let scrollWidth =  document.getElementById('scrollMenu').scrollWidth;
    this.navItemList = this.items;
    if (width < scrollWidth) {
      if (this.navItemList?.length > 1) {
        popped = this.navItemList.pop();
        this.moreItemList.push(popped);

        width = document.getElementById('scrollMenu').offsetWidth;
        scrollWidth = document.getElementById('scrollMenu').scrollWidth;
      }

    } else {
      // let i = 0;
      // while (i < 5) {
      //   i++;
      // }
      let width2 = document.getElementById('scrollMenu').offsetWidth;
      let scrollWidth2 = document.getElementById('scrollMenu').scrollWidth;
      if (width >= scrollWidth) {
        if (this.moreItemList?.length > 0) {
          popped = this.moreItemList.pop();
          this.navItemList.push(popped);
          width2 = document.getElementById('scrollMenu').offsetWidth;
          scrollWidth2 = document.getElementById('scrollMenu').scrollWidth;
        }
      }
    }
    this.navList.emit(this.navItemList);
    this.moreList.emit(this.moreItemList);
    //

  }

  /*
    listContoroller(): void {
      let lastElement;
      const width = document.getElementById('scrollMenu').offsetWidth;
      const scrollWidth = document.getElementById('scrollMenu').scrollWidth;
      console.log('offsetWidth', width);
      console.log('items----------', this.items);
      // console.log('scrollWidth', scrollWidth);
      if (width < scrollWidth) {
        lastElement = this.menuList.pop();
        console.log('menuList', this.items);
      } else {
      }
    }
  */

  ngOnInit(): void {
    this.listController();
  }
}
