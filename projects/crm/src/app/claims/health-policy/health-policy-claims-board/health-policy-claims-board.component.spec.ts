import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPolicyClaimsBoardComponent } from './health-policy-claims-board.component';

describe('HealthPolicyClaimsBoardComponent', () => {
  let component: HealthPolicyClaimsBoardComponent;
  let fixture: ComponentFixture<HealthPolicyClaimsBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthPolicyClaimsBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthPolicyClaimsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
