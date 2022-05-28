import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAccountActComponent } from './card-account-act.component';

describe('CardAccountActComponent', () => {
  let component: CardAccountActComponent;
  let fixture: ComponentFixture<CardAccountActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardAccountActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAccountActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
