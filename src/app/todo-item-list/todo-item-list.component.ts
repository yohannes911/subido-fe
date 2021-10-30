import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryRequestDto, TodoBEService, TodoItemDto } from "../subido-fe-client";

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
  styleUrls: ['./todo-item-list.component.css']
})
export class TodoItemListComponent implements OnInit {

  todoItems: TodoItemDto[];

  constructor(private todoBEService: TodoBEService, private router: Router) {
  }

  ngOnInit(): void {
    this.listTodos();
  }

  private listTodos() {
    let queryRequestDto: QueryRequestDto = {
      offset: 0,
      limit: 10
    };
    this.todoBEService.queryTodoItems(queryRequestDto)
      .subscribe(data => this.todoItems = data);
  }

  updateTodoItem(id: any) {
    this.router.navigate(['update-todo-item', id]);
  }

  deleteTodoItem(id: any) {
    this.todoBEService.deleteTodoItem(id).subscribe(data => {
      console.log(data);
      this.listTodos();
    })
  }
}
