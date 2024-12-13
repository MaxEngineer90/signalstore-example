import {patchState, signalStore, withComputed, withHooks, withMethods} from '@ngrx/signals';
import {addEntity, removeEntity, setAllEntities, setEntity, updateEntity, withEntities} from '@ngrx/signals/entities';
import {TodoDto} from '../../models/todo-dto';
import {computed, inject} from '@angular/core';
import {TodoBackendService} from '../../service/todo-backend-service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {distinctUntilChanged, exhaustMap, pipe, tap} from 'rxjs';
import {setError, setLoaded, setLoading, withRequestStatus} from '../feature/request-status.feature';
import {tapResponse} from '@ngrx/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {withSelectedEntity} from '../feature/selected-entity.feature';


export const TodosEntityStore = signalStore(
  {providedIn: 'root'},
  withEntities<TodoDto>(),
  withRequestStatus(),
  withSelectedEntity<TodoDto>(),
  withComputed((store) => ({
    todoCount: computed(() => store.entities().length),
    sortedTodos: computed(() => {
      return store.entities().sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }),
  })),
  withMethods((store, todoService = inject(TodoBackendService)) => ({
    loadTodos: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, setLoading())),
        exhaustMap(() => {
          return todoService.getTodos().pipe(
            tapResponse({
              next: (todos: Array<TodoDto>) => patchState(store, setAllEntities(todos)),
              error: (error: HttpErrorResponse) => setError(error.message),
              finalize: () => patchState(store, setLoaded()),
            })
          );
        }),
      )
    ),
    loadTodoById: rxMethod<number>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, setLoading())),
        exhaustMap((id) => {
          return todoService.getTodoById(id).pipe(
            tapResponse({
              next: (todo: TodoDto) => patchState(store, setEntity(todo)),
              error: (error: HttpErrorResponse) => setError(error.message),
              finalize: () => patchState(store, setLoaded()),
            })
          );
        })
      ),
    ),
    createTodo: rxMethod<Partial<TodoDto>>(
      pipe(
        tap(() => patchState(store, setLoading())),
        exhaustMap((todo) => {
          return todoService.createTodo(todo).pipe(
            tapResponse({
              next: (newTodo: TodoDto) => patchState(store, addEntity(newTodo)),
              error: (error: HttpErrorResponse) => setError(error.message),
              finalize: () => patchState(store, setLoaded()),
            })
          );
        })
      )
    ),
    updateTodo: rxMethod<TodoDto>(
      pipe(
        tap(() => patchState(store, setLoading())),
        exhaustMap((todo) => {
          return todoService.updateTodo(todo).pipe(
            tapResponse({
              next: (newTodo: TodoDto) => patchState(store, updateEntity({
                id: newTodo.id,
                changes: () => ({
                  title: newTodo.title,
                  completed: !newTodo.completed,
                }),
              })),
              error: (error: HttpErrorResponse) => setError(error.message),
              finalize: () => patchState(store, setLoaded()),
            })
          );
        })
      )
    ),
    deleteTodo: rxMethod<number>(
      pipe(
        tap(() => patchState(store, setLoading())),
        exhaustMap((id) => {
          return todoService.deleteTodo(id).pipe(
            tapResponse({
              next: () => {
                patchState(store, removeEntity(id));
              },
              error: (error: HttpErrorResponse) => setError(error.message),
              finalize: () => patchState(store, setLoaded()),
            })
          );
        })
      )
    ),
    selectTodoById: (id: string | number) => {
      if (store.entityMap()[id]) {
        patchState(store, {selectedEntityId: id});
      } else {
        console.error(`Todo with ID ${id} not found.`);
      }
    },
  })),
  withHooks({
    onInit({loadTodos}) {
      console.log('CALL ON INIT IN ON ENTITY STATE HOOK')
      loadTodos();
    }
  })
);
