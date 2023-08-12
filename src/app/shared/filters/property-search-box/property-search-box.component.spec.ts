import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySearchBoxComponent } from './property-search-box.component';

describe('PropertySearchBoxComponent', () => {
  let component: PropertySearchBoxComponent;
  let fixture: ComponentFixture<PropertySearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertySearchBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
