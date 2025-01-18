import {TodosEntityStore} from './todo-entity-store';
import {TestBed} from '@angular/core/testing';
import {TodoBackendService} from '../../service/todo-backend-service';
import {of} from 'rxjs';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {MockService} from 'ng-mocks';
import {provideHttpClient} from '@angular/common/http';
import {instance, mock, when} from 'ts-mockito';

export const mockTodos = [
  {id: 1, title: 'Test Todo 1', completed: false},
  {id: 2, title: 'Test Todo 2', completed: true},
];


describe('TodosEntityStore', () => {
  let store = TestBed.inject(TodosEntityStore)
  const todoBackendService: TodoBackendService = mock(
    TodoBackendService
  );

  beforeEach(() => {
    when(todoBackendService.getTodos()).thenCall(() => {
      return of(mockTodos);
    });


    // TestBed konfigurieren
    TestBed.configureTestingModule({
      providers: [
        TodosEntityStore,
        {provide: TodoBackendService, useValue: todoBackendService},
        provideHttpClientTesting(),
      ],
    });
  });

  it('should load todos successfully', () => {

    // Überprüfen, ob der Store die geladenen Todos gespeichert hat
    expect(store.sortedTodos()).toEqual([
      {id: 1, title: 'Test Todo 1', completed: false},
      {id: 2, title: 'Test Todo 2', completed: true},
    ]);
  });
});
