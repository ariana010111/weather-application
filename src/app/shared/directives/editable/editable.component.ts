import {ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {ViewModeDirective} from '@shared/directives/editable/view-mode.directive';
import {EditModeDirective} from '@shared/directives/editable/edit-mode.directive';
import {fromEvent, Subject, take} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {SubSink} from 'subsink';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-editable]',
  template: `<ng-container *ngTemplateOutlet="currentView"></ng-container>`
})
export class EditableComponent implements OnInit, OnDestroy {
  @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;
  editMode = new Subject();
  editMode$ = this.editMode.asObservable();
  mode: 'view' | 'edit' = 'view';
  sub = new SubSink();

  constructor(private elementRef: ElementRef, private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.viewModeHandler();
    this.editModeHandler();
  }
  get currentView(): TemplateRef<any> {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }
  private get element(): any {
    return this.elementRef.nativeElement;
  }
  private viewModeHandler(): void {
   this.sub.sink = fromEvent(this.element, 'click').pipe().subscribe((event: any) => {
      this.mode = 'edit';
      this.ref.detectChanges();
      this.editMode.next(true);
      event.stopPropagation();
    });
  }
  private editModeHandler(): void {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target) === false),
      take(1)
    );
    this.sub.sink = this.editMode$.pipe(
      switchMap(() => clickOutside$),
    ).subscribe(event => {
      this.update.emit(true);
      this.mode = 'view';
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
