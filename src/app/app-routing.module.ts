import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoItemListComponent } from './todo-item-list/todo-item-list.component';
import { CreateTodoItemComponent } from './create-todo-item/create-todo-item.component';
import { UpdateTodoItemComponent } from './update-todo-item/update-todo-item.component';

const routes: Routes = [
  {path: 'todo-items', component: TodoItemListComponent},
  {path: 'create-todo-item', component: CreateTodoItemComponent},
  {path: '', redirectTo: 'todo-items', pathMatch: 'full'},
  {path: 'update-todo-item/:id', component: UpdateTodoItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
