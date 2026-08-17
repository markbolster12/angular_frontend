import { Service, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Goal, GoalDto, CreateGoalDto, toGoal } from '../data/goal';

@Service()
export class GoalsService {

    private http = inject(HttpClient);

    private readonly currentDayGoals = signal<Map<string, Goal>>(new Map());

    readonly goals = computed(() => Array.from(this.currentDayGoals().values()));

    getGoal(id: string): Goal|null {
        return this.currentDayGoals().get(id) ?? null;
    }

    getGoalsByDate(date: Date): Observable<Goal[]> {
        // goal-api's /list endpoint doesn't support date filtering yet — returns everything
        return this.http
            .get<GoalDto[]>('/api/goals/list')
            .pipe(
                map(dtos => dtos.map(toGoal)),
                tap(goals => this.currentDayGoals.set(new Map(goals.map(goal => [goal.id, goal])))),
            );
    }

    createGoal(dto: CreateGoalDto): Observable<Goal> {
        return this.http
            .post<GoalDto>('/api/goals', dto)
            .pipe(
                map(toGoal),
                tap(goal => this.currentDayGoals.update(map => new Map(map).set(goal.id, goal))),
            );
    }

}
