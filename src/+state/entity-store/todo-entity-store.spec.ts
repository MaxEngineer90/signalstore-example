import { TodosEntityStore } from './todo-entity-store';
import { TestBed } from '@angular/core/testing';
import { TodoBackendService } from '../../service/todo-backend-service';
import { MockService } from 'ng-mocks';
import { EMPTY, of } from 'rxjs';
import { TodoDto } from '../../models/todo-dto';

describe('TodosEntityStore', () => {
  const mockTodos = [
    { id: 1, title: 'Test Todo 1', completed: false },
    { id: 2, title: 'Test Todo 2', completed: true },
  ];
  let todoBackendService: TodoBackendService;

  beforeEach(() => {
    todoBackendService = MockService(TodoBackendService);
    jest.spyOn(todoBackendService, 'getTodos').mockReturnValue(of(mockTodos));
    TestBed.configureTestingModule({
      providers: [
        { provide: TodoBackendService, useValue: todoBackendService },
      ],
    });
  });

  it('should load todos successfully', () => {
    const store = TestBed.inject(TodosEntityStore);
    expect(store.sortedTodos()).toEqual(mockTodos);
  });

  it('should create a new todo', () => {
    const newTodo: TodoDto = {
      id: 3,
      title: 'Test Todo 1',
      completed: false,
    };
    jest.spyOn(todoBackendService, 'createTodo').mockImplementation(() => {
      mockTodos.push(newTodo);
      return of(newTodo);
    });

    const store = TestBed.inject(TodosEntityStore);
    store.createTodo(newTodo);
    expect(todoBackendService.createTodo).toHaveBeenCalledWith(newTodo);
    store.selectTodoById(newTodo.id);
    expect(store.selectedEntity()).toEqual(expect.objectContaining(newTodo));
    expect(store.todoCount()).toBe(3);
  });

  it('should update an existing todo', () => {
    const updatedTodo = { id: 1, title: 'Updated Todo', completed: false };
    const store = TestBed.inject(TodosEntityStore);
    jest
      .spyOn(todoBackendService, 'updateTodo')
      .mockImplementation((todo) => of({ ...todo, completed: todo.completed }));
    store.updateTodo(updatedTodo);
    expect(todoBackendService.updateTodo).toHaveBeenCalledWith(updatedTodo);
    const storedTodo = store.entityMap()[1];
    expect(storedTodo.completed).toBe(true);
  });

  it('should delete a todo', () => {
    const store = TestBed.inject(TodosEntityStore);
    jest
      .spyOn(todoBackendService, 'deleteTodo')
      .mockImplementation((id) => EMPTY);
    expect(store.entityMap()[1]).toEqual(mockTodos[0]);
    store.deleteTodo(1);
    expect(todoBackendService.deleteTodo).toHaveBeenCalledWith(1);

    console.log(store.entityMap());
  });
});
