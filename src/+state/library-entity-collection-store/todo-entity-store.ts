import {patchState, signalStore, type, withHooks, withMethods} from '@ngrx/signals';
import {entityConfig, setEntities, withEntities} from '@ngrx/signals/entities';
import {BookDto} from '../../models/bookDto';
import {AuthorDto} from '../../models/authorDto';
import {CategoryDto} from '../../models/category';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {distinctUntilChanged, exhaustMap, pipe, tap} from 'rxjs';
import {setError, setLoaded, setLoading, withRequestStatus} from '../feature/request-status.feature';
import {tapResponse} from '@ngrx/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {BookBackendService} from '../../service/book/book-backend-service';
import {CategoryBackendService} from '../../service/category/category-backend-service';
import {AuthorBackendService} from '../../service/author/author-backend-service';

const bookConfig = entityConfig({
  entity: type<BookDto>(),
  collection: 'book',
  selectId: (book) => book.id,
});

const authorConfig = entityConfig({
  entity: type<AuthorDto>(),
  collection: 'author',
  selectId: (author) => author.id,
});

const categoryConfig = entityConfig({
  entity: type<CategoryDto>(),
  collection: 'category',
  selectId: (category) => category.id,
});

export const LibraryStore = signalStore(
  withEntities(bookConfig),
  withEntities(authorConfig),
  withEntities(categoryConfig),
  withRequestStatus(),
  withMethods((store, bookService = inject(BookBackendService), categoryService = inject(CategoryBackendService), authorService = inject(AuthorBackendService)) => ({
    loadBooks: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, setLoading())),
        exhaustMap(() => {
          return bookService.getBooks().pipe(
            tapResponse({
              next: (books: Array<BookDto>) =>
                patchState(store, setEntities(books, bookConfig)),
              error: (error: HttpErrorResponse) => setError(error.message),
              finalize: () => patchState(store, setLoaded()),
            }),
          );
        }),
      ),
    ),
    loadAuthors: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, setLoading())),
        exhaustMap(() => {
          return authorService.getAuthors().pipe(
            tapResponse({
              next: (author: Array<AuthorDto>) =>
                patchState(store, setEntities(author, authorConfig)),
              error: (error: HttpErrorResponse) => setError(error.message),
              finalize: () => patchState(store, setLoaded()),
            }),
          );
        }),
      ),
    ),
    loadCategories: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, setLoading())),
        exhaustMap(() => {
          return categoryService.getCategories().pipe(
            tapResponse({
              next: (categories: Array<CategoryDto>) =>
                patchState(store, setEntities(categories, categoryConfig)),
              error: (error: HttpErrorResponse) => setError(error.message),
              finalize: () => patchState(store, setLoaded()),
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit({loadCategories, loadBooks, loadAuthors}) {
      loadBooks();
      loadAuthors();
      loadCategories();
    },
  }),
);
