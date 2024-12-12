import {TodoDto} from '../models/todo-dto';
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {TodoBackendService} from '../service/todo-backend-service';
import {distinctUntilChanged, exhaustMap, pipe, tap} from 'rxjs';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {tapResponse} from '@ngrx/operators';

type TodoState = {
  todos: Array<TodoDto>;
  selectedTodo: TodoDto;
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
}


const initialState: TodoState = {
  todos: new Array<TodoDto>(),
  selectedTodo: {id: 0, title: '', completed: false} as TodoDto,
  isLoading: false,
  filter: {query: '', order: 'asc'},
}

export const TodosStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),

  withComputed(({todos, filter}) => ({
    todoCount: computed(() => todos().length),
    sortedTodos: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return todos().sort((a, b) =>
        direction * a.title.localeCompare(b.title)
      );
    }),
  })),
  withMethods((store, todoService = inject(TodoBackendService)) => ({
    loadTodos: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, {isLoading: true})),
        exhaustMap(() => {
          return todoService.getTodos().pipe(
            tapResponse({
              next: (todos: Array<TodoDto>) => patchState(store, {todos}),
              error: console.error,
              finalize: () => patchState(store, {isLoading: false}),
            })
          );
        })
      )
    ),
    loadTodoById: rxMethod<number>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, {isLoading: true})),
        exhaustMap((id) => {
          return todoService.getTodoById(id).pipe(
            tapResponse({
              next: (todo: TodoDto) => patchState(store, {selectedTodo: todo}),
              error: console.error,
              finalize: () => patchState(store, {isLoading: false}),
            })
          );
        })
      ),
    ),

    createTodo: rxMethod<Partial<TodoDto>>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        exhaustMap((todo) => {
          return todoService.createTodo(todo).pipe(
            tapResponse({
              next: (newTodo: TodoDto) => patchState(store, {todos: [...store.todos(), newTodo]}),
              error: console.error,
              finalize: () => patchState(store, {isLoading: false}),
            })
          );
        })
      )
    ),

    updateTodo: rxMethod<TodoDto>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        exhaustMap((todo) => {
          return todoService.updateTodo(todo).pipe(
            tapResponse({
              next: (updatedTodo: TodoDto) => {
                patchState(store, {
                  todos: store.todos().map(t => t.id === updatedTodo.id ? updatedTodo : t),
                });
              },
              error: console.error,
              finalize: () => patchState(store, {isLoading: false}),
            })
          );
        })
      )
    ),

    deleteTodo: rxMethod<number>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        exhaustMap((id) => {
          return todoService.deleteTodo(id).pipe(
            tapResponse({
              next: () => {
                patchState(store, {todos: store.todos().filter(todo => todo.id !== id)});
              },
              error: console.error,
              finalize: () => patchState(store, {isLoading: false}),
            })
          );
        })
      )
    )
  })),
  withHooks({
    onInit({loadTodos}) {
      console.log('CALL ON INIT IN HOOK')
      loadTodos();
    }
  })
);
