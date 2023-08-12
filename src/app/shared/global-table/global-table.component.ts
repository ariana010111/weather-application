import {Component, ContentChild, EventEmitter, forwardRef, Inject, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';
import {LazyLoadEvent} from 'primeng/api';
import {IRowDataModel} from '@features/reports/models/user-payment-methods/row-data.model';
import {CustomGridColumnsDirective} from '@shared/directives/custom-grid-columns.directive';
import {InstallmentsComponent} from '@features/reports/pages/installments/installments.component';

@Component({
  selector: 'app-global-table',
  templateUrl: './global-table.component.html',
  styleUrls: ['./global-table.component.scss']
})
export class GlobalTableComponent implements OnInit {
  rows = 5;
  @Input() isAction = false;
  @Input()  isLoading: Observable<boolean>;
  @Input()  totalRecords$: Observable<number>;
  @Input()  response$: Observable<unknown[]>;
  @Input()  selectedColumns: unknown[];
  @Output() loadDataEmitter: EventEmitter<LazyLoadEvent> = new EventEmitter<LazyLoadEvent>(null);
  @ContentChild(CustomGridColumnsDirective, {read: TemplateRef}) template: any;
  // tslint:disable-next-line:variable-name
  _selectedColumns: any[];
  constructor() { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent): void {
    this.loadDataEmitter.emit(event);
  }
}
