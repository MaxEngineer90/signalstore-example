import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, EMPTY, exhaustMap, pipe } from 'rxjs';
import { TodoDto } from '../../../models/todo-dto';
import { TodoRestController } from '../../../service/todo-rest-controller';
import { tapResponse } from '@ngrx/operators';
import { TodoContainerComponent } from '../todo-container/todo-container.component';

@Component({
  selector: 'app-todo',
  imports: [TodoContainerComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  todos = signal(new Array<TodoDto>());
  private readonly backendService = inject(TodoRestController);

  todoSize = computed(() => this.todos().length);

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos = rxMethod<void>(
    pipe(
      distinctUntilChanged(),
      exhaustMap(() => {
        return this.backendService.getTodos().pipe(
          tapResponse({
            next: (todos: Array<TodoDto>) => this.todos.set(todos),
            error: (error) => console.error('Todo`s can`t load:', error),
            finalize: () => console.log('done'),
          }),
        );
      }),
    ),
  );

  loadTodoById = rxMethod(
    pipe(
      exhaustMap((id: number) =>
        this.backendService.getTodoById(id).pipe(
          tapResponse({
            next: (todo) => console.log('Geladenes Todo:', todo),
            error: (error) => {
              console.error(`Error on load Todo by ID ${id}:`, error);
              return EMPTY;
            },
            finalize: () => console.log(`Load Todo ${id} done`),
          }),
        ),
      ),
    ),
  );

  createTodo = rxMethod(
    pipe(
      exhaustMap((newTodo: Partial<TodoDto>) =>
        this.backendService.createTodo(newTodo).pipe(
          tapResponse({
            next: (todo) => {
              const newTodo = structuredClone(todo);
              newTodo.id = todo.id++;
              this.todos.set([...this.todos(), newTodo]);
            },
            error: (error) => {
              console.error(error);
              return EMPTY;
            },
            finalize: () => console.log('Create Todo done'),
          }),
        ),
      ),
    ),
  );

  updateTodo = rxMethod(
    pipe(
      exhaustMap((updatedTodo: TodoDto) =>
        this.backendService.updateTodo(updatedTodo).pipe(
          tapResponse({
            next: (todo) => {
              console.log('Update Todo:', todo);
              this.todos.set(
                this.todos().map((t) => (t.id === todo.id ? todo : t)),
              );
            },
            error: (error) => {
              console.error(error);
              return EMPTY;
            },
            finalize: () => console.log('Update Todo done'),
          }),
        ),
      ),
    ),
  );

  deleteTodo = rxMethod(
    pipe(
      exhaustMap((id: number) =>
        this.backendService.deleteTodo(id).pipe(
          tapResponse({
            next: () => {
              this.todos.set(this.todos().filter((t) => t.id !== id));
            },
            error: (error) => {
              console.error(`Delete Todo by id: ${id}`, error);
              return EMPTY;
            },
            finalize: () => console.log(`Delete Todo ${id} done`),
          }),
        ),
      ),
    ),
  );
}
