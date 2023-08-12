import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  } from '@angular/core';

@Directive({
  selector: '[appEllipsis]'
})
export class EllipsisDirective implements AfterViewInit, OnChanges {
  @Input() styleName: string;
  private readonly domElement: HTMLElement;
  ellipsis = {
    'text-overflow': 'ellipsis',
    overflow: 'hidden',
    'white-space': 'nowrap',
  };
  filtersBox = {
    'min-width': '60px',
    'max-width': '130px',
    width: 'calc(95%)',
    'text-overflow': 'ellipsis',
    overflow: 'hidden',
    'white-space': 'nowrap',
    display: 'inline-block',
    'vertical-align': 'bottom',
  };

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
    this.domElement = this.elementRef.nativeElement;

  }

  ngOnChanges(): void {
    switch (this.styleName) {
      case 'filtersBox':
        this.setStyle(this.filtersBox);
        break;
      case 'ellipsis':
        this.setStyle(this.ellipsis);
        break;
    }
  }

  setStyle(object: object): void {
    Object.keys(object).forEach(element => {
      this.renderer.setStyle(
        this.domElement, `${element}`, object[element]
      );

    });
  }

  ngAfterViewInit(): void {
    this.setToolTip();
  }

  // @HostListener('window:resize', ['$event.target'])
  @HostListener('mouseenter', ['$event.target'])
  setToolTip(): void {
    if (this.domElement.offsetWidth < this.domElement.scrollWidth) {
      this.renderer.setAttribute(this.domElement, 'title',
        this.domElement.textContent);
    } else {
      this.renderer.removeAttribute(this.domElement, 'title');
    }
  }
}
