import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CreateTodoItemDto, Priority, TodoBEService } from "../subido-fe-client";
import { ErrorResponseDto } from "../error-response";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

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

  @ViewChild('modalContent')
  private modalContent: TemplateRef<any>;

  errorResult: ErrorResponseDto;

  constructor(private todoBEService: TodoBEService, private router: Router, private modalService: NgbModal) {
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
    }, error => {
      console.log(error);
      this.errorResult = error.error;
      this.modalService.open(this.modalContent, {ariaLabelledBy: 'modal-basic-title'});
    });
  }

  goToTodoItemList() {
    this.router.navigate(['/todo-items']);
  }

  onCancel() {
    this.goToTodoItemList();
  }

  onSubmit() {
    console.log(this.todoItem);
    this.saveTodoItem();
  }
}
