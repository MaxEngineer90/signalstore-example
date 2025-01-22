import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CategoryDto} from '../../models/category';

@Injectable({providedIn: 'root'})
export class CategoryBackendService {
  getCategories(): Observable<Array<CategoryDto>> {
    const categories: Array<CategoryDto> = [
      {id: 1, name: 'Fiction'},
      {id: 2, name: 'Non-Fiction'},
      {id: 3, name: 'Science'},
      {id: 4, name: 'Fantasy'},
    ];
    return of(categories);
  }
}

