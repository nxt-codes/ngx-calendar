import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent, GetWeekViewArgs, WeekDay, WeekView, WeekViewHour, WeekViewHourColumn, WeekViewTimeEvent } from '../../models/models';
import { addDate, addDaysWithExclusions, getDayObject, getEndOfDay, getStartOfDay, getWeekViewPeriod, subDays } from '../../utils/myutils';
import { ViewService } from '../../services/view.service';
import { DefaultLibConfiguration, LibConfigurationProvider } from '../../../public-api';

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
    // this.view = this.prepareWeekView(this.events)
    console.log('view', this.view)
  }

  

  

  constructor(public configurationProvider: LibConfigurationProvider, private defaultLibConfiguration: DefaultLibConfiguration, private viewService: ViewService) {
    console.log(Object.assign(defaultLibConfiguration.config, configurationProvider.config))
  }

  ngOnInit(): void {
    // this.createView()

    this.viewService.days$.subscribe( {
      next: (days) => {}
    })
  }

  ngAfterViewInit(): void {
    this.viewService.createDays(this.viewDate, this.weekStartsOn, this.excludeDays, this.weekendDays, new Date("Mon Dec 16 2024 00:00:00 GMT+0100"), new Date("Sun Dec 22 2024 23:59:59 GMT+0100"))
    this.refreshBody()
  }

  trackByHourColumn = (index: number, column: WeekViewHourColumn) => column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;
  trackByWeekTimeEvent = (index: number, weekEvent: WeekViewTimeEvent) => (weekEvent.event.id ? weekEvent.event.id : weekEvent.event);
  trackByHour = (index: number, hour: WeekViewHour) => hour.segments[0].date.toISOString()
}
