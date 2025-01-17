import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TodoDto} from '../../models/todo-dto';
import {TodosEntityStore} from '../../+state/entity-store/todo-entity-store';

@Component({
  selector: 'app-todo-entity',
  imports: [],
  templateUrl: './todo-entity.component.html',
  styleUrl: './todo-entity.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoEntityComponent {
  readonly entityStore = inject(TodosEntityStore);

  selectTodo(id: number) {
    this.entityStore.loadTodoById(id);
    this.entityStore.selectTodoById(id);
  }

  createNewTodo(newTodo: Partial<TodoDto>): void {
    this.entityStore.createTodo(newTodo);
  }

  updateTodo(updatedTodo: TodoDto): void {
    this.entityStore.updateTodo(updatedTodo);
  }

  deleteTodo(id: number): void {
    this.entityStore.deleteTodo(id);
  }
}
