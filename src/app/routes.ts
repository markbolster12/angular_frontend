import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { DayGoals } from './components/day-goals/day-goals';

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
    }

]

export default routeConfig;