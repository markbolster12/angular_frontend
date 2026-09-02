import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { DayGoals } from './components/day-goals/day-goals';
import { GoalHistory } from './components/goal-history/goal-history';
import { RecurringGoalForm } from './components/recurring-goal-form/recurring-goal-form';
import { GoalTree } from './components/goal-tree/goal-tree';

const routeConfig: Routes = [ 
    {
        'path': '',
        'redirectTo': '/home',
        'pathMatch': 'full'
    },{
        'path': 'home',
        'component': Home,
        'title': 'Goals'
    },
    {
        'path': 'today',
        'component': DayGoals,
        'title': 'Todays Goals'
    },
    {
        'path': 'goals/history',
        'component': GoalHistory,
        'title': 'Goal History'
    },
    {
        'path': 'goals/recurring/new',
        'component': RecurringGoalForm,
        'title': 'New Recurring Goal'
    },
    {
        'path': 'goals/tree',
        'component': GoalTree,
        'title': 'Goal Tree'
    },

]

export default routeConfig;