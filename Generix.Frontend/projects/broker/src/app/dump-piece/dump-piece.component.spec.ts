import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumpPieceComponent } from './dump-piece.component';

describe('DumpPieceComponent', () => {
  let component: DumpPieceComponent;
  let fixture: ComponentFixture<DumpPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumpPieceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumpPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
