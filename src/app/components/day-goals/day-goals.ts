import { Component, inject } from '@angular/core';
import { GoalComponent } from '../goal-component/goal-component';
import { GoalsService } from '../../services/goals-service';
import { GoalForm } from '../goal-form/goal-form';

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
  todaysGoals = this.goalsService.goals;

  showCreate = false;

  constructor() {
    this.goalsService.getGoalsByDate(new Date()).subscribe();
  }

  toggleCreate() {
    this.showCreate = !this.showCreate;
  }

  onGoalCreated() {
    this.showCreate = false;
  }

}
