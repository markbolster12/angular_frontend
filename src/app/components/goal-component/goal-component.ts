import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Goal, GoalStatus } from '../../data/goal';
import { GoalsService } from '../../services/goals-service';
import { isSameDate } from '../../util/week';

@Component({
  selector: 'app-goal-component',
  imports: [DatePipe, MatIconModule],
  templateUrl: 'goal-component.html',
  styleUrl: 'goal-component.css',
})
export class GoalComponent {
  private goalsService = inject(GoalsService);

  goal = input.required<Goal>();
  // Set when the goal list is already filtered to one exact day — the start date badge
  // would be redundant there, since every visible goal is implicitly "on this day".
  hideStartDate = input(false);

  protected readonly isSameDate = isSameDate;

  onStatusChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const status: GoalStatus = checkbox.checked ? 'COMPLETED' : 'ACTIVE';

    this.goalsService.updateGoalStatus(this.goal().id, status).subscribe({
      // The checkbox is bound to goal().status, which only reflects the change once the
      // service's shared signal updates on success — on failure, flip it back manually.
      error: () => (checkbox.checked = !checkbox.checked),
    });
  }
}
