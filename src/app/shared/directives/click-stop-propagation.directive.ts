import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appClickStopPropagation]'
})
export class ClickStopPropagationDirective {

  constructor() {
  }

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    if (event.target.className.indexOf('apply-button') === -1) {
      event.stopPropagation();
    }
  }
}
