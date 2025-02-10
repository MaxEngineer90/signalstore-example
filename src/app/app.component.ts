import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoComponent } from './components/without-signal-store/todo.component';

@Component({
  selector: 'app-root',
  imports: [TodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'signalstore-tutorial';
}
