import { inject, Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorDto } from '../../models/author-dto';
import { BookDto } from '../../models/book-dto';
import { CategoryDto } from '../../models/category-dto';

@Injectable({
  providedIn: 'root',
})
export class LibraryBackendControllerService {
  private readonly apiUrl = inject(Configuration).baseUrl;
  private readonly http = inject(HttpClient);

  getAuthors(): Observable<AuthorDto[]> {
    return this.http.get<AuthorDto[]>(this.apiUrl + '/authors');
  }

  getBooks(): Observable<BookDto[]> {
    return this.http.get<BookDto[]>(this.apiUrl + '/books');
  }

  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(this.apiUrl + '/categories');
  }
}
