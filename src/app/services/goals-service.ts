import { Service } from '@angular/core';
import { Goal } from '../data/goal';

@Service()
export class GoalsService {

    currentDayGoals : Map<string, Goal> = new Map();

    constructor() {
        let goalsList: Goal[] = [
            {
                'id': '1',
                'date': new Date(),
                'name': 'Goal 1',
                'details': 'This is a goal details',
                'completed': false
            },
            {
                'id': '3',
                'date': new Date(),
                'name': 'Goal 3',
                'details': 'This is a goal details',
                'completed': false
            }
        ];
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

    getGoalsByDate(date: Date): Goal[] {
        //Fake data
        return [...this.currentDayGoals.values()];

    }
  
}
