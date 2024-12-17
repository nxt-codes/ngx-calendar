import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventTitleComponent } from './calendar-event-title.component';

describe('CalendarEventTitleComponent', () => {
  let component: CalendarEventTitleComponent;
  let fixture: ComponentFixture<CalendarEventTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarEventTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarEventTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
