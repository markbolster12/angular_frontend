import { Component, inject, input } from '@angular/core';
import { Goal } from '../../data/goal';
import { GoalsService } from '../../services/goals-service';

@Component({
  selector: 'app-goal-component',
  imports: [],
  templateUrl: 'goal-component.html',
  styleUrl: 'goal-component.css',
})
export class GoalComponent {
  goal = input.required<Goal>();

  constructor() {
    
  }

  ngOnInit() {
  }
}
