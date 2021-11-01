import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoItemListComponent } from './todo-item-list/todo-item-list.component';
import { CreateTodoItemComponent } from './create-todo-item/create-todo-item.component';
import { FormsModule } from '@angular/forms';
import { UpdateTodoItemComponent } from './update-todo-item/update-todo-item.component';
import { todoInterceptorProvider } from "./interceptors";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "@danielmoncada/angular-datetime-picker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GlobalDataService } from "./global-data.service";

@NgModule({
  declarations: [
    AppComponent,
    TodoItemListComponent,
    CreateTodoItemComponent,
    UpdateTodoItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule
  ],
  providers: [todoInterceptorProvider, GlobalDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
