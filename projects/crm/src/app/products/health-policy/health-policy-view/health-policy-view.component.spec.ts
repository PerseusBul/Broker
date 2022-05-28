import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPolicyViewComponent } from './health-policy-view.component';

describe('HealthPolicyViewComponent', () => {
  let component: HealthPolicyViewComponent;
  let fixture: ComponentFixture<HealthPolicyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthPolicyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthPolicyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
