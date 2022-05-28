import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimRegistryRequestCardComponent } from './claim-registry-request-card.component';

describe('ClaimRegistryRequestCardComponent', () => {
  let component: ClaimRegistryRequestCardComponent;
  let fixture: ComponentFixture<ClaimRegistryRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimRegistryRequestCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimRegistryRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
