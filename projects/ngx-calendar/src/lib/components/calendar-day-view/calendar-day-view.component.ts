import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent, GetWeekViewArgs, WeekDay, WeekView, WeekViewHour, WeekViewHourColumn, WeekViewTimeEvent } from '../../models/models';
import { addDate, addDaysWithExclusions, getDayObject, getEndOfDay, getStartOfDay, subDays } from '../../utils/myutils';

@Component({
  selector: 'calendar-day-view',
  standalone: true,
  imports: [],
  templateUrl: './calendar-day-view.component.html',
  styleUrl: './calendar-day-view.component.sass'
})
export class CalendarDayViewComponent implements OnInit {
  @Input() dayEndHour: number = 23
  @Input() dayEndMinute: number = 59
  days: WeekDay[] = []
  @Input() daysInWeek: number = 0
  @Input() dayStartHour: number = 0
  @Input() dayStartMinute: number = 0
  @Input() events: CalendarEvent[] = []
  @Input() excludeDays: number[] = []
  @Input() hourDuration: number = 1
  @Input() hourSegments: number = 2
  @Input() hourSegmentHeight: number = 30
  @Input() minimumEventHeight: number = 30
  @Input() precision: 'days' | 'minutes' = 'days'
  @Input() viewDate!: Date
  @Input() weekStartsOn: number = 1
  @Input() weekendDays: number[] = [0, 6]

  view!: WeekView

  protected refreshHeader(): void {
    // this.days = this.getWeekViewHeader(this.viewDate, this.weekStartsOn, this.excludeDays, this.weekendDays, new Date("Mon Dec 09 2024 00:00:00 GMT+0100"), new Date("Sun Dec 15 2024 23:59:59 GMT+0100"))
  }

  protected refreshBody(): void {
    console.log('events', this.events)
    this.view = this.prepareWeekView(this.events)
    console.log('view', this.view)
  }

  prepareWeekView(events: CalendarEvent[]) {
    return this.getWeekView({
      events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      precision: this.precision,
      absolutePositionedEvents: true,
      hourSegments: this.hourSegments,
      hourDuration: this.hourDuration,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute,
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute,
      },
      segmentHeight: this.hourSegmentHeight,
      weekendDays: this.weekendDays,
      minimumEventHeight: this.minimumEventHeight,
      ...this.getWeekViewPeriod(
        this.viewDate,
        this.weekStartsOn,
        this.excludeDays,
        this.daysInWeek
      )
    })
  }

  getWeekView(args: GetWeekViewArgs): WeekView | any {
    // console.log('args', args)
    // const { period } = super.getWeekView(args);
    // const view: WeekView = {
    //   period,
    //   allDayEventRows: [],
    //   hourColumns: [],
      // users: [...args.users],
    // };

    // view.users.forEach((user, columnIndex) => {
    //   const events = args.events.filter(
    //     (event: any) => event.meta.user.id === user.id
    //   );
    //   const columnView = super.getWeekView({
    //     ...args,
    //     events,
    //   });
    //   view.hourColumns.push(columnView.hourColumns[0]);
    //   columnView.allDayEventRows.forEach(({ row }: any, rowIndex: any) => {
    //     view.allDayEventRows[rowIndex] = view.allDayEventRows[rowIndex] || {
    //       row: [],
    //     };
    //     view.allDayEventRows[rowIndex].row.push({
    //       ...row[0],
    //       offset: columnIndex,
    //       span: 1,
    //     });
    //   });
    // });

    // return view;
  }

  getWeekViewPeriod(viewDate: Date, weekStartsOn: number, excluded: number[] = [], daysInWeek?: number): { viewStart: Date; viewEnd: Date } {
    let startOfDay = getStartOfDay(viewDate)
    let startOfWeek = new Date("Mon Dec 09 2024 00:00:00 GMT+0100") // getStartOfWeek(viewDate, weekStartsOn)
    let endOfWeek = new Date("Sun Dec 15 2024 23:59:59 GMT+0100") // getEndOfWeek(viewDate, weekStartsOn)
    let viewStart = daysInWeek ? startOfDay : startOfWeek
    while (excluded.indexOf(viewDate.getDay()) > -1 && viewStart < endOfWeek) {
      viewStart = addDate(viewStart, 1)
    }
    if (daysInWeek) {
      const viewEnd = getEndOfDay(addDaysWithExclusions(viewStart, daysInWeek - 1, excluded))
      return { viewStart, viewEnd }
    } else {
      let viewEnd = endOfWeek
      while (excluded.indexOf(viewDate.getDay()) > -1 && viewEnd > viewStart) {
        viewEnd = subDays(viewEnd, 1)
      }
      return { viewStart, viewEnd }
    }
  }

  constructor() {
    console.log('constructor')
  }

  ngOnInit(): void {
    console.log('init')
    // this.createView()

    // this.days$.subscribe( {
    //   next: (days) => console.log('days obs:', days)
    // })
  }

  ngAfterViewInit(): void {
    this.createDays(this.viewDate, this.weekStartsOn, this.excludeDays, this.weekendDays, new Date("Mon Dec 16 2024 00:00:00 GMT+0100"), new Date("Sun Dec 22 2024 23:59:59 GMT+0100"))
    this.refreshBody()
  }

  createDays(viewDate: Date, weekStartsOn: number, excluded?: number[], weekendDays?: number[], viewStart?: Date, viewEnd?: Date) {
    console.log('create days')
    let days: any[] = []
    if (viewStart && viewEnd) {
      
      while (viewStart <= viewEnd) {
        const dayObj = getDayObject(viewStart, weekStartsOn, excluded, weekendDays)
        console.log('dayObj', dayObj)

        // const date = this.getStartOfDay(viewStart)
        // const day = date.getDay()
        // const isPast = date < getStartOfDay(new Date())
        // const isToday = date >= getStartOfDay(new Date()) && date < getEndOfDay(new Date())
        // const isFuture = date > getEndOfDay(new Date())
        // const isWeekend = weekendDays ? weekendDays.indexOf(date.getDay()) > -1 : false
        // const daysObj = { date, day, isPast, isToday, isFuture, isWeekend }
        // console.log('daysObj', daysObj)
        // console.log('days1', days)
        days.push(dayObj)
        // console.log('days2', days)
        viewStart = addDate(viewStart, 1)
      }
      console.log('create days', days)
      // this._days.next(days)
    }
  }

  trackByHourColumn = (index: number, column: WeekViewHourColumn) => column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;
  trackByWeekTimeEvent = (index: number, weekEvent: WeekViewTimeEvent) => (weekEvent.event.id ? weekEvent.event.id : weekEvent.event);
  trackByHour = (index: number, hour: WeekViewHour) => hour.segments[0].date.toISOString()
}
