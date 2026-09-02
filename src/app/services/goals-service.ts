import { Service, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Goal, GoalDto, CreateGoalDto, GoalStatus, UpdateGoalStatusDto, toGoal } from '../data/goal';
import { RecurringGoalDto, CreateRecurringGoalDto } from '../data/recurring-goal';

@Service()
export class GoalsService {

    private http = inject(HttpClient);

    private readonly currentDayGoals = signal<Map<string, Goal>>(new Map());

    readonly goals = computed(() => Array.from(this.currentDayGoals().values()));

    getGoal(id: string): Goal|null {
        return this.currentDayGoals().get(id) ?? null;
    }

    getGoalsByDateRange(start: Date, end: Date): Observable<Goal[]> {
        return this.http
            .get<GoalDto[]>('/api/goals', {
                params: { startTime: start.toISOString(), endTime: end.toISOString() },
            })
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

    updateGoalStatus(id: string, status: GoalStatus): Observable<Goal> {
        const dto: UpdateGoalStatusDto = { status };
        return this.http
            .patch<GoalDto>(`/api/goals/${id}/status`, dto)
            .pipe(
                map(toGoal),
                tap(goal => this.currentDayGoals.update(map => new Map(map).set(goal.id, goal))),
            );
    }

    createRecurringGoal(dto: CreateRecurringGoalDto): Observable<RecurringGoalDto> {
        return this.http.post<RecurringGoalDto>('/api/recurring-goals', dto);
    }

}
