import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {BookDto} from '../../models/bookDto';

@Injectable({providedIn: 'root'})
export class BookBackendService {
  getBooks(): Observable<Array<BookDto>> {
    const books: Array<BookDto> = [
      {id: 1, title: 'Book 1', authorId: 1, categoryId: 1},
      {id: 2, title: 'Book 2', authorId: 2, categoryId: 2},
      {id: 3, title: 'Book 3', authorId: 1, categoryId: 3},
      {id: 4, title: 'Book 4', authorId: 3, categoryId: 1},
    ];
    return of(books);
  }
}
