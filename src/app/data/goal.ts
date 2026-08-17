export interface Goal {
    id: string,
    name: string,
    details: string,
    date: Date,
    completed: boolean
}

// matches goal-api's GoalDto record exactly: no `date` field yet, `title` not `name`
export interface GoalDto {
    id: string,
    title: string,
    details: string,
    completed: boolean
}

export function toGoal(dto: GoalDto): Goal {
    return {
        id: dto.id,
        name: dto.title,
        details: dto.details,
        completed: dto.completed,
        date: new Date(), // backend doesn't return a date yet
    };
}
