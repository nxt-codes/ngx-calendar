import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { CalendarEvent, PlacementArray, WeekDay, WeekView, WeekViewAllDayEvent, WeekViewAllDayEventResize, WeekViewAllDayEventRow, WeekViewHour, WeekViewHourColumn, WeekViewTimeEvent } from '../../models/models';
import { ViewService } from '../../services/view.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CalendarWeekViewEventComponent } from '../calendar-week-view-event/calendar-week-view-event.component';

@Component({
  selector: 'calendar-day-view',
  standalone: true,
  imports: [
    CalendarWeekViewEventComponent,
    CommonModule
  ],
  templateUrl: './calendar-day-view.component.html',
  styleUrl: './calendar-day-view.component.sass'
})
export class CalendarDayViewComponent implements OnInit {
  isVisible: boolean = false
  // @Input() dayEndHour: number = 23
  // @Input() dayEndMinute: number = 59
  // days: WeekDay[] = []
  @Input() daysInWeek: number = 1
  // @Input() dayStartHour: number = 0
  // @Input() dayStartMinute: number = 0
  @Input() events: CalendarEvent[] = []
  // @Input() excludeDays: number[] = []
  // @Input() hourDuration: number = 1
  // @Input() hourSegments: number = 2
  // @Input() hourSegmentHeight: number = 30
  // @Input() minimumEventHeight: number = 30
  // @Input() precision: 'days' | 'minutes' = 'days'
  @Input() viewDate: Date = new Date()
  // @Input() weekStartsOn: number = 1
  // @Input() weekendDays: number[] = [0, 6]

  // @Input() allDayEventsLabelTemplate: TemplateRef<any>
  allDayEventResizes: Map<WeekViewAllDayEvent, WeekViewAllDayEventResize> = new Map()
  rtl = false
  days: WeekDay[] = []

  @Input() locale: string = 'en'
  @Input() tooltipPlacement: PlacementArray = 'auto'
  @Input() tooltipTemplate!: TemplateRef<any>
  @Input() tooltipAppendToBody: boolean = true
  @Input() tooltipDelay: number | null = null
  @Input() eventTemplate!: TemplateRef<any>
  @Input() eventActionsTemplate!: TemplateRef<any>
  @Input() eventTitleTemplate!: TemplateRef<any>
  @Output() eventClicked = new EventEmitter<{
    event: CalendarEvent;
    sourceEvent: MouseEvent | KeyboardEvent;
  }>();

  // view!: WeekView

  days$: Observable<WeekDay[]> = this.viewService.days$
  view$: Observable<WeekView | undefined> = this.viewService.view$

  protected refreshHeader(): void {
    // this.days = this.getWeekViewHeader(this.viewDate, this.weekStartsOn, this.excludeDays, this.weekendDays, new Date("Mon Dec 09 2024 00:00:00 GMT+0100"), new Date("Sun Dec 15 2024 23:59:59 GMT+0100"))
  }

  protected refreshBody(): void {
    // this.view = this.viewService.prepareWeekView(this.viewDate, this.events)
    // this.view = this.prepareWeekView(this.events)
  }

  constructor(private viewService: ViewService) {
    // console.log(Object.assign(defaultLibConfiguration.config, configurationProvider.config))
  }

  ngOnInit(): void {
    // this.createView()

    this.viewService.days$.subscribe( {
      next: (days) => {
        this.days = days
        console.log('days obs', days)
      }
    })
    this.viewService.view$.subscribe( {
      next: (view) => console.log('view obs', view)
    })
    this.viewService.events$.subscribe( {
      next: (events) => console.log('events obs', events)
    })

    setTimeout(() => {
      this.isVisible = true
    },2000)
  }

  ngAfterViewInit(): void {
    this.viewService.createDays(this.viewDate, new Date("Mon Dec 16 2024 00:00:00 GMT+0100"), new Date("Sun Dec 22 2024 23:59:59 GMT+0100"))
    this.viewService.createWeekView(this.viewDate)
    this.refreshBody()
  }

  // events
  trackById = (index: number, row: WeekViewAllDayEventRow) => row.id
  trackByWeekDayHeaderDate = (index: number, day: WeekDay) => day.date
  trackByWeekAllDayEvent = ( index: number, weekEvent: WeekViewAllDayEvent) => (weekEvent.event.id ? weekEvent.event.id : weekEvent.event)

  trackByHourColumn = (index: number, column: WeekViewHourColumn) => column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;
  trackByWeekTimeEvent = (index: number, weekEvent: WeekViewTimeEvent) => (weekEvent.event.id ? weekEvent.event.id : weekEvent.event);
  trackByHour = (index: number, hour: WeekViewHour) => hour.segments[0].date.toISOString()
}
