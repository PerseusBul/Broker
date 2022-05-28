import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSectionDividerComponent } from './form-section-divider.component';

describe('FormSectionDividerComponent', () => {
  let component: FormSectionDividerComponent;
  let fixture: ComponentFixture<FormSectionDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSectionDividerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSectionDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
