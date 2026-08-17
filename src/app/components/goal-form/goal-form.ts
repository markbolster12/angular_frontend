import { Component, inject, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { GoalsService } from '../../services/goals-service';
import { Goal, GoalDto } from '../../data/goal';
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

  
  goalFormGroup = new FormGroup({
    id: new FormControl('', ),
    title: new FormControl('',),
    details: new FormControl('', ),
    start: new FormControl('', ),
    deadline: new FormControl('', ),

  });

  onSubmit() {
    let goal:Goal = {
      id: this.goalFormGroup.value.id?this.goalFormGroup.value.id:"",
      name: this.goalFormGroup.value.title?this.goalFormGroup.value.title:"",
      details: this.goalFormGroup.value.details?this.goalFormGroup.value.details:"",
      date: new Date(),
      completed: false
    }
    this.goalService.saveGoal(goal);
    this.formSubmit.emit(goal);
    console.log(this.goalFormGroup.value);
  }

}


