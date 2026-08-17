import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Goal, GoalDto, toGoal } from '../data/goal';

@Service()
export class GoalsService {

    private http = inject(HttpClient);

    currentDayGoals : Map<string, Goal> = new Map();

    constructor() {
        let goalsList: Goal[] = [];
        for(const goal of goalsList.values()) {
            this.currentDayGoals.set(goal.id, goal);
        }
    }

    getGoal(id: string): Goal|null {
        let byId: Goal|undefined = this.currentDayGoals.get(id);
        if(byId === undefined)
            return null;
        else
            return byId;

    }

    getGoalsByDate(date: Date): Observable<Goal[]> {
        // goal-api's /list endpoint doesn't support date filtering yet — returns everything
        return this.http
            .get<GoalDto[]>('/api/goals/list')
            .pipe(map(dtos => dtos.map(toGoal)));
    }

    saveGoal(goal: Goal): Goal {
        goal.id = crypto.randomUUID();
        this.currentDayGoals.set(goal.id, goal);
        return goal;
    }
  
}
