export interface ViewPeriod {
    start: Date;
    end: Date;
    events: CalendarEvent[];
}
export interface WeekViewAllDayEvent {
    event: CalendarEvent;
    offset: number;
    span: number;
    startsBeforeWeek: boolean;
    endsAfterWeek: boolean;
}
export interface WeekViewAllDayEventRow {
    id?: string;
    row: WeekViewAllDayEvent[];
}
export interface WeekView {
    period: ViewPeriod;
    allDayEventRows: WeekViewAllDayEventRow[];
    hourColumns: WeekViewHourColumn[];
}
export interface User {
    id: number;
    name: string;
    color: EventColor;
}
interface DayViewScheduler extends WeekView {
    users: User[];
}
export interface EventColor {
    primary: string;
    secondary: string;
    secondaryText?: string;
}
export interface EventAction {
    id?: string | number;
    label: string;
    cssClass?: string;
    a11yLabel?: string;
    onClick({ event, sourceEvent, }: {
        event: CalendarEvent;
        sourceEvent: MouseEvent | KeyboardEvent;
    }): any;
}
export interface CalendarEvent<MetaType = any> {
    id?: string | number;
    start: Date;
    end?: Date;
    title: string;
    color?: EventColor;
    actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: MetaType;
}
export interface WeekViewTimeEvent {
    event: CalendarEvent;
    height: number;
    width: number;
    top: number;
    left: number;
    startsBeforeDay: boolean;
    endsAfterDay: boolean;
}
export interface WeekViewHourSegment {
    isStart: boolean;
    date: Date;
    displayDate: Date;
    cssClass?: string;
}
export interface WeekViewHour {
    segments: WeekViewHourSegment[];
}
export interface WeekViewHourColumn {
    date: Date;
    hours: WeekViewHour[];
    events: WeekViewTimeEvent[];
}
export interface WeekDay {
    date: Date;
    day: number;
    isPast: boolean;
    isToday: boolean;
    isFuture: boolean;
    isWeekend: boolean;
    cssClass?: string;
}
interface Time {
    hour: number;
    minute: number;
}
export interface GetWeekViewArgs {
    events?: CalendarEvent[];
    viewDate: Date;
    weekStartsOn: number;
    excluded?: number[];
    precision?: 'minutes' | 'days';
    absolutePositionedEvents?: boolean;
    hourSegments?: number;
    hourDuration?: number;
    dayStart: Time;
    dayEnd: Time;
    weekendDays?: number[];
    segmentHeight: number;
    viewStart?: Date;
    viewEnd?: Date;
    minimumEventHeight?: number;
}
interface GetWeekViewArgsWithUsers extends GetWeekViewArgs {
    users: User[];
}