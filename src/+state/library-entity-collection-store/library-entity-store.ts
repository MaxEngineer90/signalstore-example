import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  entityConfig,
  setEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { BookDto } from '../../models/book-dto';
import { AuthorDto } from '../../models/author-dto';
import { CategoryDto } from '../../models/category-dto';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, exhaustMap, pipe, tap } from 'rxjs';
import {
  setError,
  setLoaded,
  setLoading,
  withRequestStatus,
} from '../feature/request-status.feature';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { LibraryBackendControllerService } from '../../service/library/library-backend-controller.service';

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
  { providedIn: 'root' },
  withEntities(bookConfig),
  withEntities(authorConfig),
  withEntities(categoryConfig),
  withRequestStatus(),
  withState(() => ({
    selectedCategoryId: null as string | null,
  })),
  withComputed(({ categoryEntityMap, selectedCategoryId }) => ({
    selectedCategory: computed(() => {
      const id = selectedCategoryId();
      return id ? categoryEntityMap()[id] : null;
    }),
  })),
  withMethods(
    (store, libaryService = inject(LibraryBackendControllerService)) => ({
      loadBooks: rxMethod<void>(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, setLoading())),
          exhaustMap(() => {
            return libaryService.getBooks().pipe(
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
            return libaryService.getAuthors().pipe(
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
            return libaryService.getCategories().pipe(
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
      selectCategory: (id: string) =>
        patchState(store, { selectedCategoryId: id }),
    }),
  ),
  withHooks({
    onInit({ loadCategories, loadBooks, loadAuthors }) {
      loadBooks();
      loadAuthors();
      loadCategories();
    },
  }),
);
