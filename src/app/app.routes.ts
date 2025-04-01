import { Routes } from '@angular/router';
import { TodoEntityComponent } from './components/todo/todo-entity/todo-entity.component';
import { TodoStoreComponent } from './components/todo/todo-store/todo-store.component';
import { LibraryComponent } from './components/library/library.component';

export const routes: Routes = [
  { path: '', redirectTo: '/store', pathMatch: 'full' },
  { path: 'store', component: TodoStoreComponent },
  { path: 'entity-store', component: TodoEntityComponent },
  { path: 'library', component: LibraryComponent },
];
