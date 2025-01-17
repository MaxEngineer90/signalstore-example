import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';

import {TodoDto} from '../../../models/todo-dto';
import {TodosStore} from '../../../+state/store/todo-store';
import {TodoContainerComponent} from '../todo-container/todo-container.component';

@Component({
  selector: 'app-todo-store',
  imports: [
    TodoContainerComponent
  ],
  templateUrl: './todo-store.component.html',
  styleUrl: './todo-store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoStoreComponent {
  readonly store = inject(TodosStore);
  todos: Signal<Array<TodoDto>> = this.store.sortedTodos;
  todoCount = this.store.todoCount;
  selectedTodo = this.store.selectedTodo;


  selectTodo(id: number) {
    this.store.loadTodoById(id);
  }

  createNewTodo(newTodo: Partial<TodoDto>): void {
    this.store.createTodo(newTodo);
  }

  updateTodo(updatedTodo: TodoDto): void {
    this.store.updateTodo(updatedTodo);
  }

  deleteTodo(id: number): void {
    this.store.deleteTodo(id);
  }
}
