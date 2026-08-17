import { Component, inject, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { GoalsService } from '../../services/goals-service';
import { Goal, CreateGoalDto } from '../../data/goal';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-goal-form',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: 'goal-form.html',
  styles: ``,
})
export class GoalForm {

  goalService: GoalsService = inject(GoalsService);
  @Output() formSubmit = new EventEmitter<Goal>();

  today: string = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }).format(new Date());
  

  goalFormGroup = new FormGroup({
    id: new FormControl('', ),
    title: new FormControl('',),
    details: new FormControl('', ),
    start: new FormControl(new Date(), ),
    deadline: new FormControl(new Date(), ),

  });

  ngOnInit() {
  }

  onSubmit() {
    const { title, details, start, deadline } = this.goalFormGroup.value;
    const dto: CreateGoalDto = {
      title: title ?? '',
      details: details ?? '',
      beginAt: start ? start.toISOString() : undefined,
      deadline: deadline ? deadline.toISOString() : undefined,
    };
    this.goalService.createGoal(dto).subscribe((goal: Goal) => {
      this.formSubmit.emit(goal);
      this.goalFormGroup.reset();
    });
  }

}


