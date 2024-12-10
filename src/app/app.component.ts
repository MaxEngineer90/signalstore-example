import {Component} from '@angular/core';
import {TodoStoreComponent} from './todo-store/todo-store.component';

@Component({
  selector: 'app-root',
  imports: [TodoStoreComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'signalstore-tutorial';
}

