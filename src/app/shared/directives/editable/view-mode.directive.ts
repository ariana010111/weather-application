import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appViewMode]'
})
export class ViewModeDirective {
@Input() list;
  constructor(public tpl: TemplateRef<any>) { }

}
