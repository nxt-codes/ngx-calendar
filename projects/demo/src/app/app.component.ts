import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarDayViewComponent, CalendarEvent } from '../../../ngx-calendar/src/public-api';
import { CalendarModule } from '../../../ngx-calendar/src/lib/ngx-calendar.module';

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
    CalendarDayViewComponent
    // RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  viewDate: Date = new Date()
  weekStartsOn: number = 1
  excludeDays: number[] = []
  weekendDays: number[] = [0, 6]

  constructor() {}
  
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

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event)
  }
}
