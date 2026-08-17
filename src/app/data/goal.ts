import type { components } from './generated/goal-api';

export interface Goal {
    id: string,
    title: string,
    details: string,
    beginAt: Date,
    deadline: Date,
    createdAt: Date,
    completed: boolean
}

// generated from goal-api's OpenAPI spec — all fields optional since the schema marks them so
export type GoalDto = components['schemas']['GoalDto'];
export type CreateGoalDto = components['schemas']['CreateGoalDTO'];

export function toGoal(dto: GoalDto): Goal {
    return {
        id: dto.id ?? '',
        title: dto.title ?? '',
        details: dto.details ?? '',
        completed: dto.completed ?? false,
        beginAt: dto.beginAt ? new Date(dto.beginAt) : new Date(),
        deadline: dto.deadline ? new Date(dto.deadline) : new Date(),
        createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
    };
}
