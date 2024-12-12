import {Component, inject, Signal} from '@angular/core';
import {TodoDto} from '../../models/todo-dto';
import {TodosEntityStore} from '../../+state/entity-store/todo-entity-store';
import {TodoContainerComponent} from '../todo-container/todo-container.component';

@Component({
  selector: 'app-todo-entity',
  imports: [
    TodoContainerComponent
  ],
  templateUrl: './todo-entity.component.html',
  styleUrl: './todo-entity.component.css'
})
export class TodoEntityComponent {
  readonly entityStore = inject(TodosEntityStore);
  todos: Signal<Array<TodoDto>> = this.entityStore.sortedTodos;
  todoCount = this.entityStore.todoCount;

  //selectedTodo = this.store.selectedTodo;


  selectTodo(id: number) {
    this.entityStore.loadTodoById(id);
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
