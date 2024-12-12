/*
import {TodoBackendService} from '../service/todo-backend-service';
import {TodosStore} from './todo-store';
import {createServiceFactory, mockProvider, SpectatorService} from '@ngneat/spectator/jest';

describe('TodosStore', () => {
  let spectator: SpectatorService<TodosStore>;
  let todoService: TodoBackendService;

  const createService = createServiceFactory({
    service: TodosStore,
    providers: [
      mockProvider(TodoBackendService)]
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should initialize with the default state', () => {
    expect(spectator.service.state).toEqual({
      todos: [],
      selectedTodo: {id: 0, title: '', completed: false},
      isLoading: false,
      filter: {query: '', order: 'asc'},
    });
  });

  it('should load todos', (done) => {
    const todoService = spectator.inject(TodoBackendService);
    const mockTodos: TodoDto[] = [
      {id: 1, title: 'Test Todo 1', completed: false},
      {id: 2, title: 'Test Todo 2', completed: true},
    ];

    todoService.getTodos.mockReturnValue(of(mockTodos));

    spectator.service.loadTodos();

    spectator.service.isLoading().subscribe((isLoading) => {
      if (!isLoading) {
        expect(spectator.service.todos()).toEqual(mockTodos);
        done();
      }
    });
  });

  it('should load a todo by ID', (done) => {
    const todoService = spectator.inject(TodoBackendService);
    const mockTodo: TodoDto = {id: 1, title: 'Test Todo 1', completed: false};

    todoService.getTodoById.mockReturnValue(of(mockTodo));

    spectator.service.loadTodoById(1);

    spectator.service.isLoading().subscribe((isLoading) => {
      if (!isLoading) {
        expect(spectator.service.selectedTodo()).toEqual(mockTodo);
        done();
      }
    });
  });

  it('should create a new todo', (done) => {
    const todoService = spectator.inject(TodoBackendService);
    const newTodo: TodoDto = {id: 3, title: 'New Todo', completed: false};

    todoService.createTodo.mockReturnValue(of(newTodo));

    spectator.service.createTodo({title: 'New Todo', completed: false});

    spectator.service.isLoading().subscribe((isLoading) => {
      if (!isLoading) {
        expect(spectator.service.todos()).toContain(newTodo);
        done();
      }
    });
  });

  it('should update an existing todo', (done) => {
    const todoService = spectator.inject(TodoBackendService);
    const existingTodos: TodoDto[] = [
      {id: 1, title: 'Old Todo 1', completed: false},
    ];
    const updatedTodo: TodoDto = {id: 1, title: 'Updated Todo', completed: true};

    spectator.service.state.todos = existingTodos;

    todoService.updateTodo.mockReturnValue(of(updatedTodo));

    spectator.service.updateTodo(updatedTodo);

    spectator.service.isLoading().subscribe((isLoading) => {
      if (!isLoading) {
        expect(spectator.service.todos()).toEqual([updatedTodo]);
        done();
      }
    });
  });

  it('should delete a todo', (done) => {
    const todoService = spectator.inject(TodoBackendService);
    const existingTodos: TodoDto[] = [
      {id: 1, title: 'Todo 1', completed: false},
      {id: 2, title: 'Todo 2', completed: true},
    ];

    spectator.service.state.todos = existingTodos;

    todoService.deleteTodo.mockReturnValue(of(null));

    spectator.service.deleteTodo(1);

    spectator.service.isLoading().subscribe((isLoading: boolean) => {
      if (!isLoading) {
        expect(spectator.service.todos()).toEqual([
          {id: 2, title: 'Todo 2', completed: true},
        ]);
        done();
      }
    });
  });

  it('should compute todo count correctly', () => {
    spectator.service.state.todos = [
      {id: 1, title: 'Todo 1', completed: false},
      {id: 2, title: 'Todo 2', completed: true},
    ];

    expect(spectator.service.todoCount()).toBe(2);
  });

  it('should compute sorted todos based on filter', () => {
    spectator.service.state.todos = [
      {id: 2, title: 'B Task', completed: false},
      {id: 1, title: 'A Task', completed: true},
    ];
    spectator.service.state.filter.order = 'asc';

    expect(spectator.service.sortedTodos()).toEqual([
      {id: 1, title: 'A Task', completed: true},
      {id: 2, title: 'B Task', completed: false},
    ]);

    spectator.service.state.filter.order = 'desc';

    expect(spectator.service.sortedTodos()).toEqual([
      {id: 2, title: 'B Task', completed: false},
      {id: 1, title: 'A Task', completed: true},
    ]);
  });
});
*/
