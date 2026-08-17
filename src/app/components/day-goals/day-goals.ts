import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Goal } from '../../data/goal';
import { GoalComponent } from '../goal-component/goal-component';
import { GoalsService } from '../../services/goals-service';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { GoalForm } from '../goal-form/goal-form';

@Component({
  selector: 'app-day-goals',
  imports: [GoalComponent, GoalForm],
  templateUrl: 'day-goals.html',
  styleUrl: 'day-goals.css',
})
export class DayGoals {

  private goalsService = inject(GoalsService);

  todaysGoals = toSignal(this.goalsService.getGoalsByDate(new Date()), { initialValue: [] as Goal[] });

  showCreate = false;

  toggleCreate() {
    this.showCreate = !this.showCreate;
  }

}
