import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { DayGoals } from './components/day-goals/day-goals';
import { GoalForm } from './components/goal-form/goal-form';

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
        'path': 'goals/new',
        'component': GoalForm,
        'title': 'New Goal'
    },

]

export default routeConfig;