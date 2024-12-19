import { CommonModule } from '@angular/common';
import { Component, Input, NgZone, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject, interval, map, Observable, startWith, switchMap, switchMapTo } from 'rxjs';
import { differenceInMinutes, isSameDay, setHours, setMinutes } from '../../../utils/myutils';

@Component({
  selector: 'calendar-week-view-current-time-marker',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './calendar-week-view-current-time-marker.component.html',
  styleUrl: './calendar-week-view-current-time-marker.component.sass'
})
export class CalendarWeekViewCurrentTimeMarkerComponent implements OnChanges {
  @Input() columnDate!: Date;
  @Input() dayStartHour!: number;
  @Input() dayStartMinute!: number;
  @Input() dayEndHour!: number;
  @Input() dayEndMinute!: number;
  @Input() hourSegments!: number;
  @Input() hourDuration!: number;
  @Input() hourSegmentHeight!: number;

  columnDate$ = new BehaviorSubject<Date | undefined>(undefined)

  marker$: Observable<{ isVisible: boolean, top: number }> = this.zone.onStable.pipe(
    switchMap(() => interval(60 * 1000)),
    startWith(0),
    switchMapTo(this.columnDate$),
    map((columnDate) => {
      const startOfDay = setMinutes(setHours(columnDate!, this.dayStartHour), this.dayStartMinute)
      const endOfDay = setMinutes(setHours(columnDate!, this.dayEndHour), this.dayEndMinute)
      const hourHeightModifier = (this.hourSegments * this.hourSegmentHeight) / (this.hourDuration || 60)
      const now = new Date()
      return {
        isVisible: isSameDay(columnDate!, now) && now >= startOfDay && now <= endOfDay,
        top: differenceInMinutes(now, startOfDay) * hourHeightModifier
      }
    })
  )

  constructor(private zone: NgZone) {}
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['columnDate']) {
      this.columnDate$.next(changes['columnDate'].currentValue);
    }
  }
}
