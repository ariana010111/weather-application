import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit, OnChanges {
  @Input() elementId: string = null;
  displaySidebar = false;
  @Output() donePrint: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnChanges(): void {
    if (this.elementId) {
      this.onPrint(this.elementId);
    }
  }

  ngOnInit(): void {
  }

  onPrint(element: string): void {
    const printContents = document.getElementById(element).innerHTML;
    this.displaySidebar = true;
    let originalContents;
    setTimeout(() => {
      originalContents = document.getElementById('printContent').innerHTML;
      document.getElementById('printContent').innerHTML = printContents;
      window.print();
      document.getElementById('printContent').innerHTML = originalContents;
      this.displaySidebar = false;
      this.donePrint.emit(true);
    }, 200);

  }

}
