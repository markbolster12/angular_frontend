import { Component, inject, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { GoalsService } from '../../services/goals-service';
import { Goal, CreateGoalDto } from '../../data/goal';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {provideNativeDateAdapter} from '@angular/material/core';
import {startOfDay, endOfDay} from '../../util/date';


@Component({
  selector: 'app-goal-form',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSlideToggleModule],
  templateUrl: 'goal-form.html',
  styleUrl: 'goal-form.css',
})
export class GoalForm {

  goalService: GoalsService = inject(GoalsService);
  @Output() formSubmit = new EventEmitter<Goal>();

  goalFormGroup = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    details: new FormControl('', { nonNullable: true }),
    useSeparateDates: new FormControl(false, { nonNullable: true }),
    date: new FormControl(new Date(), { nonNullable: true }),
    start: new FormControl(new Date(), { nonNullable: true }),
    deadline: new FormControl(new Date(), { nonNullable: true }),
  });

  get useSeparateDates() {
    return this.goalFormGroup.controls.useSeparateDates.value;
  }

  onSubmit() {
    const { title, details, useSeparateDates, date, start, deadline } = this.goalFormGroup.getRawValue();

    const [beginAt, deadlineAt] = useSeparateDates ? [start, deadline] : [startOfDay(date), endOfDay(date)];

    const dto: CreateGoalDto = {
      title,
      details,
      beginAt: beginAt.toISOString(),
      deadline: deadlineAt.toISOString(),
    };

    this.goalService.createGoal(dto).subscribe((goal: Goal) => {
      this.formSubmit.emit(goal);
      this.goalFormGroup.reset({
        title: '',
        details: '',
        useSeparateDates: false,
        date: new Date(),
        start: new Date(),
        deadline: new Date(),
      });
    });
  }

}


