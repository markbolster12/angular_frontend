import { Component, inject, signal, computed } from '@angular/core';
import { GoalComponent } from '../goal-component/goal-component';
import { GoalsService } from '../../services/goals-service';
import { GoalForm } from '../goal-form/goal-form';
import { startOfWeek, endOfWeek, daysInWeek, isSameDate } from '../../util/week';

const rangeLabelFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
const weekdayLabelFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

@Component({
  selector: 'app-day-goals',
  imports: [GoalComponent, GoalForm],
  templateUrl: 'day-goals.html',
  styleUrl: 'day-goals.css',
})
export class DayGoals {

  private goalsService = inject(GoalsService);

  // reads the service's shared signal, so it updates automatically whenever
  // any component (e.g. GoalForm) creates a goal through the same service instance
  private readonly rangeGoals = this.goalsService.goals;

  showCreate = false;

  rangeStart = signal(startOfWeek(new Date()));
  rangeEnd = signal(endOfWeek(new Date()));

  // Weekday index (0 = Sunday .. 6 = Saturday) within the current range, not an absolute
  // date — so the selection carries over naturally when the range shifts to another week.
  // That also leaves room for a future "any Monday" vs. "this exact date" mode switch.
  selectedWeekday = signal<number | null>(null);

  rangeLabel = computed(
    () => `${rangeLabelFormat.format(this.rangeStart())} – ${rangeLabelFormat.format(this.rangeEnd())}`,
  );

  weekDays = computed(() =>
    daysInWeek(this.rangeStart()).map(date => ({
      date,
      label: weekdayLabelFormat.format(date),
      dayOfMonth: date.getDate(),
    })),
  );

  visibleGoals = computed(() => {
    const selected = this.selectedWeekday();
    if (selected === null) {
      return this.rangeGoals();
    }
    const selectedDate = this.weekDays()[selected].date;
    return this.rangeGoals().filter(goal => isSameDate(goal.deadline, selectedDate));
  });

  constructor() {
    this.refresh();
  }

  previousWeek() {
    this.shiftWeek(-7);
  }

  nextWeek() {
    this.shiftWeek(7);
  }

  resetToThisWeek() {
    this.rangeStart.set(startOfWeek(new Date()));
    this.rangeEnd.set(endOfWeek(new Date()));
    this.refresh();
  }

  selectWeekday(day: number) {
    this.selectedWeekday.update(current => (current === day ? null : day));
  }

  toggleCreate() {
    this.showCreate = !this.showCreate;
  }

  onGoalCreated() {
    this.showCreate = false;
  }

  private shiftWeek(days: number) {
    const anchor = new Date(this.rangeStart());
    anchor.setDate(anchor.getDate() + days);
    this.rangeStart.set(startOfWeek(anchor));
    this.rangeEnd.set(endOfWeek(anchor));
    this.refresh();
  }

  private refresh() {
    this.goalsService.getGoalsByDateRange(this.rangeStart(), this.rangeEnd()).subscribe();
  }

}
