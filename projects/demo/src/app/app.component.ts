import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarDayViewComponent, CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from '../../../ngx-calendar/src/public-api';
import { CalendarModule } from '../../../ngx-calendar/src/lib/ngx-calendar.module';
import { Subject } from 'rxjs';
import { isSameDay } from '../../../ngx-calendar/src/lib/utils/myutils';
import { CalendarWeekViewComponent } from '../../../ngx-calendar/src/lib/components/week/calendar-week-view/calendar-week-view.component';

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CalendarDayViewComponent,
    CalendarWeekViewComponent
    // RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date()
  
  events: CalendarEvent[] = [
    {
      title: 'An all day event',
      color: colors.yellow,
      start: new Date(),
      allDay: true,
    },
    {
      title: 'A non all day event',
      color: colors.blue,
      start: new Date(),
    },
  ];

  refresh = new Subject<void>()

  validateEventTimesChanged = (
    { event, newStart, newEnd, allDay }: CalendarEventTimesChangedEvent,
    addCssClass = true
  ) => {
    if (event.allDay) {
      return true;
    }

    delete event.cssClass;
    // don't allow dragging or resizing events to different days
    const sameDay = isSameDay(newStart, newEnd!);

    if (!sameDay) {
      return false;
    }

    // don't allow dragging events to the same times as other events
    const overlappingEvent = this.events.find((otherEvent) => {
      return (otherEvent !== event && !otherEvent.allDay && ((otherEvent.start < newStart && newStart < otherEvent.end!) || (otherEvent.start < newEnd! && newStart < otherEvent.end!))
      );
    });

    if (overlappingEvent) {
      if (addCssClass) {
        event.cssClass = 'invalid-position';
      } else {
        return false;
      }
    }

    return true;
  };
  
  eventTimesChanged(
    eventTimesChangedEvent: CalendarEventTimesChangedEvent
  ): void {
    delete eventTimesChangedEvent.event.cssClass;
    if (this.validateEventTimesChanged(eventTimesChangedEvent, false)) {
      const { event, newStart, newEnd } = eventTimesChangedEvent;
      event.start = newStart;
      event.end = newEnd;
      this.refresh.next();
    }
  }
}
