// Sunday-start week, matching the day-of-week convention used elsewhere in the app (Date.getDay()).

import { startOfDay, endOfDay } from './date';

export function startOfWeek(date: Date): Date {
    const start = startOfDay(date);
    start.setDate(start.getDate() - start.getDay());
    return start;
}

export function endOfWeek(date: Date): Date {
    const end = startOfWeek(date);
    end.setDate(end.getDate() + 6);
    return endOfDay(end);
}

export function daysInWeek(start: Date): Date[] {
    return Array.from({ length: 7 }, (_, i) => {
        const day = new Date(start);
        day.setDate(day.getDate() + i);
        return day;
    });
}

export function isSameDate(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
