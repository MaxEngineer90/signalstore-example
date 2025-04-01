import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoDto } from '../../models/todo-dto';
import { Configuration } from '../../config/configuration';

@Injectable({
  providedIn: 'root',
})
export class TodoBackendService {
  private readonly apiUrl = inject(Configuration).baseUrl;
  private readonly http = inject(HttpClient);

  getTodos(): Observable<TodoDto[]> {
    return this.http.get<TodoDto[]>(this.apiUrl + '/todos');
  }

  getTodoById(id: number): Observable<TodoDto> {
    return this.http.get<TodoDto>(`${this.apiUrl + '/todos'}/${id}`);
  }

  createTodo(todo: Partial<TodoDto>): Observable<TodoDto> {
    return this.http.post<TodoDto>(this.apiUrl + '/todos', todo);
  }

  updateTodo(todo: TodoDto): Observable<TodoDto> {
    return this.http.put<TodoDto>(`${this.apiUrl + '/todos'}/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl + '/todos'}/${id}`);
  }
}
