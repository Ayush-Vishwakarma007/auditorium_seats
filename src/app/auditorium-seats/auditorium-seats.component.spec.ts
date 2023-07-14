import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriumSeatsComponent } from './auditorium-seats.component';

describe('AuditoriumSeatsComponent', () => {
  let component: AuditoriumSeatsComponent;
  let fixture: ComponentFixture<AuditoriumSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditoriumSeatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditoriumSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
