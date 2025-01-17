import {Routes} from '@angular/router';
import {TodoEntityComponent} from './components/todo-entity/todo-entity.component';
import {TodoStoreComponent} from './components/todo-store/todo-store.component';

export const routes: Routes = [
  {path: '', redirectTo: '/store', pathMatch: 'full'},
  {path: 'store', component: TodoStoreComponent},
  {path: 'entity-store', component: TodoEntityComponent},
];
