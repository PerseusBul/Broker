import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPolicyClaimsRegistryAddFilesDialogComponent } from './health-policy-claims-registry-add-files-dialog.component';

describe('HealthPolicyClaimsRegistryAddFilesDialogComponent', () => {
  let component: HealthPolicyClaimsRegistryAddFilesDialogComponent;
  let fixture: ComponentFixture<HealthPolicyClaimsRegistryAddFilesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthPolicyClaimsRegistryAddFilesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthPolicyClaimsRegistryAddFilesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
