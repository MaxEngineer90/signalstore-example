import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { LibraryFacade } from '../../../+state/library-entity-collection-store/library-facade';
import { MatCard } from '@angular/material/card';
import {
  MatDivider,
  MatList,
  MatListItem,
  MatNavList,
} from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-library',
  imports: [
    MatCard,
    MatNavList,
    MatListItem,
    MatList,
    MatDivider,
    MatProgressSpinner,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryComponent implements OnInit {
  private readonly facade = inject(LibraryFacade);

  readonly categories = this.facade.categories;
  readonly selectedCategory = this.facade.selectedCategory;
  readonly selectedCategoryId = this.facade.selectedCategoryId;
  readonly books = this.facade.books;
  readonly isLoading = this.facade.isLoading;

  readonly booksInSelectedCategory = computed(() =>
    this.books().filter(
      (book) => book.categoryId === this.selectedCategoryId(),
    ),
  );

  readonly autoSelectCategoryEffect = effect(() => {
    const categories = this.categories();
    const selectedId = this.selectedCategoryId();

    if (categories.length > 0 && !selectedId) {
      const last = categories[categories.length - 1];
      this.facade.selectCategory(last.id);
    }
  });

  ngOnInit(): void {
    this.facade.loadBooks();
    this.facade.loadCategories();
  }

  onSelectCategory(id: string): void {
    this.facade.selectCategory(id);
  }
}
