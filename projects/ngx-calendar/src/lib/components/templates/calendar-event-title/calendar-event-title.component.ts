import { Component, Input, TemplateRef } from '@angular/core';
import { CalendarEvent } from '../../../models/models';

@Component({
  selector: 'calendar-event-title',
  standalone: true,
  imports: [],
  templateUrl: './calendar-event-title.component.html',
  styleUrl: './calendar-event-title.component.sass'
})
export class CalendarEventTitleComponent {
  @Input() event!: CalendarEvent
  @Input() customTemplate: TemplateRef<any> | undefined
  @Input() view!: string
}
