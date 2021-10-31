import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryRequestDto, QueryResponseDto, TodoBEService, TodoItemDto } from "../subido-fe-client";

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
  styleUrls: ['./todo-item-list.component.css']
})
export class TodoItemListComponent implements OnInit {

  queryRequestDto: QueryRequestDto = {
    offset: 0,
    limit: 3
  };
  queryResponse: QueryResponseDto = {
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    todoItems: new Array<TodoItemDto>(0)
  };

  constructor(private todoBEService: TodoBEService, private router: Router) {
  }

  ngOnInit(): void {
    this.listTodos();
  }

  displayDate(d: any) {
    return new Date(new Date(d * 1000));
  }

  pages() {
    return new Array(this.queryResponse.totalPages);
  }

  gotoPage(n: number) {
    console.log("goto page" + n);
    if (this.queryRequestDto.limit) {
      this.queryRequestDto.offset = this.queryRequestDto.limit * n;
      this.listTodos();
    }
  }

  limitChanged() {
    if (this.queryRequestDto.limit && this.queryRequestDto.limit > 0) {
      this.listTodos();
    }
  }

  private listTodos() {
    this.todoBEService.queryTodoItems(this.queryRequestDto)
      .subscribe(data => this.queryResponse = data);
  }

  updateTodoItem(id: any) {
    this.router.navigate(['update-todo-item', id]);
  }

  newItemClick() {
    this.router.navigate(['create-todo-item']);
  }

  deleteTodoItem(id: any) {
    this.todoBEService.deleteTodoItem(id).subscribe(data => {
      console.log(data);
      this.listTodos();
    })
  }
}
