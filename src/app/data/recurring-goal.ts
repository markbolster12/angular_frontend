import type { components } from './generated/goal-api';

export type RecurrenceFrequency = NonNullable<components['schemas']['CreateRecurringGoalDTO']['frequency']>;
export type RecurrenceEnd = NonNullable<components['schemas']['CreateRecurringGoalDTO']['endType']>;
export type DayOfWeek = NonNullable<components['schemas']['CreateRecurringGoalDTO']['daysOfWeek']>[number];

export type RecurringGoalDto = components['schemas']['RecurringGoalDto'];
export type CreateRecurringGoalDto = components['schemas']['CreateRecurringGoalDTO'];

const DAYS_OF_WEEK: DayOfWeek[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

// Maps JS Date.getDay() convention (0 = Sunday) to the backend's java.time.DayOfWeek name.
export function toDayOfWeek(jsDay: number): DayOfWeek {
    return DAYS_OF_WEEK[jsDay];
}
