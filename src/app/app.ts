import {Component} from '@angular/core';
import { } from '@angular/router'
import { Main } from './components/main/main';

@Component({
  selector: 'app-root',
  imports: [Main],
  template: `<app-main>`,
  styleUrls: ['./app.css'],
})
export class App {
  title = 'default';
}
