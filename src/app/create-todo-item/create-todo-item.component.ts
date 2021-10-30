import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateTodoItemDto, Priority, TodoBEService } from "../subido-fe-client";

@Component({
  selector: 'app-create-todo-item',
  templateUrl: './create-todo-item.component.html',
  styleUrls: ['./create-todo-item.component.css']
})
export class CreateTodoItemComponent implements OnInit {

  priorityTypes = Object.values(Priority);

  todoItem: CreateTodoItemDto = new class implements CreateTodoItemDto {
    name: string;
    deadline?: Date;
    priority: Priority.LOW;
  }

  constructor(private todoBEService: TodoBEService, private router: Router) {
  }

  ngOnInit(): void {
  }

  saveTodoItem() {
    if (this.todoItem.priority === null || this.todoItem.priority === undefined) {
      this.todoItem.priority = Priority.LOW;
    }
    this.todoBEService.createTodoItem(this.todoItem).subscribe(data => {
        console.log(data);
        this.goToTodoItemList();
      },
      error => console.log(error));
  }

  goToTodoItemList() {
    this.router.navigate(['/todo-items']);
  }

  onSubmit() {
    console.log(this.todoItem);
    this.saveTodoItem();
  }
}
