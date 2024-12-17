import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { PlacementArray, WeekViewAllDayEvent, WeekViewHourColumn, WeekViewTimeEvent } from '../../models/models';
import { CalendarEventTitleComponent } from '../templates/calendar-event-title/calendar-event-title.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'calendar-week-view-event',
  standalone: true,
  imports: [
    CalendarEventTitleComponent,
    CommonModule
  ],
  templateUrl: './calendar-week-view-event.component.html',
  styleUrl: './calendar-week-view-event.component.sass'
})
export class CalendarWeekViewEventComponent {
  @Input() locale!: string
  @Input() weekEvent!: WeekViewAllDayEvent | WeekViewTimeEvent
  @Input() column!: WeekViewHourColumn
  @Input() daysInWeek!: number
  @Output() eventClicked = new EventEmitter<{
    sourceEvent: MouseEvent | KeyboardEvent;
  }>();
}
