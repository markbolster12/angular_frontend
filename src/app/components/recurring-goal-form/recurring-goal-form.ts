import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { provideNativeDateAdapter } from '@angular/material/core';
import { GoalsService } from '../../services/goals-service';
import { CreateRecurringGoalDto, RecurrenceEnd, RecurrenceFrequency, toDayOfWeek } from '../../data/recurring-goal';

export type { RecurrenceFrequency, RecurrenceEnd };

export const WEEKDAYS = [
  { label: 'Su', value: 0 },
  { label: 'Mo', value: 1 },
  { label: 'Tu', value: 2 },
  { label: 'We', value: 3 },
  { label: 'Th', value: 4 },
  { label: 'Fr', value: 5 },
  { label: 'Sa', value: 6 },
] as const;

@Component({
  selector: 'app-recurring-goal-form',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
  ],
  templateUrl: 'recurring-goal-form.html',
  styleUrl: 'recurring-goal-form.css',
})
export class RecurringGoalForm {
  private goalService = inject(GoalsService);

  readonly weekdays = WEEKDAYS;

  recurringGoalFormGroup = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    details: new FormControl('', { nonNullable: true }),
    start: new FormControl(new Date(), { nonNullable: true }),
    frequency: new FormControl<RecurrenceFrequency>('WEEKLY', { nonNullable: true }),
    interval: new FormControl(1, { nonNullable: true }),
    daysOfWeek: new FormControl<number[]>([new Date().getDay()], { nonNullable: true }),
    end: new FormControl<RecurrenceEnd>('NEVER', { nonNullable: true }),
    endDate: new FormControl<Date | null>(null),
    occurrences: new FormControl<number | null>(3),
  });

  get isWeekly() {
    return this.recurringGoalFormGroup.controls.frequency.value === 'WEEKLY';
  }

  get endType() {
    return this.recurringGoalFormGroup.controls.end.value;
  }

  isDaySelected(day: number) {
    return this.recurringGoalFormGroup.controls.daysOfWeek.value.includes(day);
  }

  toggleDay(day: number) {
    const control = this.recurringGoalFormGroup.controls.daysOfWeek;
    const days = control.value;
    control.setValue(
      days.includes(day) ? days.filter(d => d !== day) : [...days, day].sort(),
    );
  }

  onSubmit() {
    const { title, details, start, frequency, interval, daysOfWeek, end, endDate, occurrences } =
      this.recurringGoalFormGroup.getRawValue();

    const dto: CreateRecurringGoalDto = {
      title,
      details,
      startDate: start.toISOString(),
      frequency,
      interval,
      daysOfWeek: frequency === 'WEEKLY' ? daysOfWeek.map(toDayOfWeek) : undefined,
      endType: end,
      endDate: end === 'ON_DATE' && endDate ? endDate.toISOString() : undefined,
      occurrences: end === 'AFTER_OCCURRENCES' ? occurrences ?? undefined : undefined,
    };

    this.goalService.createRecurringGoal(dto).subscribe(() => {
      this.recurringGoalFormGroup.reset({
        title: '',
        details: '',
        start: new Date(),
        frequency: 'WEEKLY',
        interval: 1,
        daysOfWeek: [new Date().getDay()],
        end: 'NEVER',
        endDate: null,
        occurrences: 3,
      });
    });
  }
}
