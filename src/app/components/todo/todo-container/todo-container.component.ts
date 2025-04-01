import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TodoDto } from '../../../../models/todo-dto';

@Component({
  selector: 'app-todo-container',
  imports: [],
  templateUrl: './todo-container.component.html',
  styleUrl: './todo-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoContainerComponent {
  todos = input.required<Array<TodoDto>>();

  selectTodoById = output<number>();
  createTodo = output<Partial<TodoDto>>();
  updateTodo = output<TodoDto>();
  removeTodoById = output<number>();

  markTodoAsSelectedByID(id: number) {
    this.selectTodoById.emit(id);
  }

  createNewTodo(): void {
    const newTodo: Partial<TodoDto> = {
      title: 'Created Todo',
      completed: false,
    };
    this.createTodo.emit(newTodo);
  }

  updateTodoById(id: number): void {
    const updatedTodo: TodoDto = { id, title: 'Updated Todo', completed: true };
    this.updateTodo.emit(updatedTodo);
  }

  deleteTodo(id: number): void {
    this.removeTodoById.emit(id);
  }
}
