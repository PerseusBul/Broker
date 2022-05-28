import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPolicyBoardComponent } from './health-policy-board.component';

describe('HealthPolicyBoardComponent', () => {
  let component: HealthPolicyBoardComponent;
  let fixture: ComponentFixture<HealthPolicyBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthPolicyBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthPolicyBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
