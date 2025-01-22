import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AuthorDto} from '../../models/authorDto';

@Injectable({providedIn: 'root'})
export class AuthorBackendService {
  getAuthors(): Observable<AuthorDto[]> {
    const authors: Array<AuthorDto> = [
      {id: 1, name: 'Author 1', birthYear: 1970},
      {id: 2, name: 'Author 2', birthYear: 1980},
      {id: 3, name: 'Author 3', birthYear: 1990},
      {id: 4, name: 'Author 4', birthYear: 2000},
    ];
    return of(authors);
  }
}
