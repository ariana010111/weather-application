import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationFlowComponent } from './organization-flow.component';

describe('OrganizationFlowComponent', () => {
  let component: OrganizationFlowComponent;
  let fixture: ComponentFixture<OrganizationFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
