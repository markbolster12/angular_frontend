import { Component, inject } from '@angular/core';
import { Goal } from '../../data/goal';
import { GoalComponent } from '../goal-component/goal-component';
import { GoalsService } from '../../services/goals-service';

@Component({
  selector: 'app-day-goals',
  imports: [GoalComponent],
  templateUrl: 'day-goals.html',
  styleUrl: 'day-goals.css',
})
export class DayGoals {

  todaysGoals: Goal[] = [];

  constructor(goalsService: GoalsService) {
    this.todaysGoals = goalsService.getGoalsByDate(new Date());

  }



}
