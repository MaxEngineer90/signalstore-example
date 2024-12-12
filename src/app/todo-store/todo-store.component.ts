import {Component, inject, Signal} from '@angular/core';
import {TodosStore} from '../../+state/todo-store';
import {TodoDto} from '../../models/todo-dto';

@Component({
  selector: 'app-todo-store',
  imports: [],
  templateUrl: './todo-store.component.html',
  styleUrl: './todo-store.component.css'
})
export class TodoStoreComponent {
  readonly store = inject(TodosStore);
  todos: Signal<Array<TodoDto>> = this.store.sortedTodos;
  todoCount = this.store.todoCount;
  selectedTodo = this.store.selectedTodo;


  selectTodo(id: number) {
    this.store.loadTodoById(id);
  }

  createNewTodo(): void {
    const newTodo: Partial<TodoDto> = {title: 'Neues Todo', completed: false};
    this.store.createTodo(newTodo);
  }

  updateTodo(id: number): void {
    const updatedTodo: TodoDto = {id, title: 'Aktualisiertes Todo', completed: true};
    this.store.updateTodo(updatedTodo);
  }

  deleteTodo(id: number): void {
    this.store.deleteTodo(id);
  }
}
