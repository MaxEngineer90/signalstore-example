import { computed, inject, Injectable } from '@angular/core';
import { LibraryStore } from './library-entity-store';

@Injectable({ providedIn: 'root' })
export class LibraryFacade {
  private readonly store = inject(LibraryStore);

  readonly books = this.store.bookEntities;
  readonly authors = this.store.authorEntities;
  readonly categories = this.store.categoryEntities;

  readonly selectedCategory = this.store.selectedCategory;
  readonly selectedCategoryId = this.store.selectedCategoryId;

  readonly isLoading = this.store.loading;
  readonly isLoaded = this.store.loaded;
  readonly error = this.store.error;

  readonly bookCount = computed(() => this.books().length);
  readonly authorCount = computed(() => this.authors().length);
  readonly categoryCount = computed(() => this.categories().length);

  loadBooks(): void {
    this.store.loadBooks();
  }

  loadAuthors(): void {
    this.store.loadAuthors();
  }

  loadCategories(): void {
    this.store.loadCategories();
  }

  selectCategory(id: string): void {
    this.store.selectCategory(id);
    console.log('Selected category ID:', this.selectedCategoryId());
  }
}
