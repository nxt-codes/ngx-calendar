import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarEvent, GetWeekViewArgs, WeekDay, WeekView } from '../models/models';
import { addDate, getDayObject } from '../utils/myutils';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  private _days = new BehaviorSubject<WeekDay[]>([])
  public days$ = this._days.asObservable()

  private _view = new BehaviorSubject<WeekView | undefined>(undefined)
  public view$ = this._view.asObservable()
  
  constructor() { }

  createDays(viewDate: Date, weekStartsOn: number, excluded?: number[], weekendDays?: number[], viewStart?: Date, viewEnd?: Date) {
    let days: any[] = []
    if (viewStart && viewEnd) {
      while (viewStart <= viewEnd) {
        const dayObj = getDayObject(viewStart, weekStartsOn, excluded, weekendDays)
        days.push(dayObj)
        viewStart = addDate(viewStart, 1)
      }
      this._days.next(days)
    }
  }

  prepareWeekView(events: CalendarEvent[]) {
    // return this.getWeekView({  
    //   events,
    //   viewDate: this.viewDate,
    //   weekStartsOn: this.weekStartsOn,
    //   excluded: this.excludeDays,
    //   precision: this.precision,
    //   absolutePositionedEvents: true,
    //   hourSegments: this.hourSegments,
    //   hourDuration: this.hourDuration,
    //   dayStart: {
    //     hour: this.dayStartHour,
    //     minute: this.dayStartMinute,
    //   },
    //   dayEnd: {
    //     hour: this.dayEndHour,
    //     minute: this.dayEndMinute,
    //   },
    //   segmentHeight: this.hourSegmentHeight,
    //   weekendDays: this.weekendDays,
    //   minimumEventHeight: this.minimumEventHeight,
    //   ...getWeekViewPeriod(
    //     this.viewDate,
    //     this.weekStartsOn,
    //     this.excludeDays,
    //     this.daysInWeek
    //   )
    // })
  }

  getWeekView(args: GetWeekViewArgs): WeekView | any {
    // console.log('args', args)
    // const { period } = super.getWeekView(args);
    // const view: WeekView = {
    //   period,
    //   allDayEventRows: [],
    //   hourColumns: [],
    //   users: [...args.users],
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
}
