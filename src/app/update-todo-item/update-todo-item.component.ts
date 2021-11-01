import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Priority, TodoBEService, TodoItemDto, UpdateTodoItemDto } from "../subido-fe-client";
import { ErrorResponseDto } from "../error-response";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-update-todo-item',
  templateUrl: './update-todo-item.component.html',
  styleUrls: ['./update-todo-item.component.css']
})
export class UpdateTodoItemComponent implements OnInit {

  priorityTypes = Object.values(Priority);

  id: number;

  todoItem: UpdateTodoItemDto = new class implements UpdateTodoItemDto {
    deadline: Date;
    id: number;
    name: string;
    priority: Priority.HIGH;
  }

  @ViewChild('modalContent')
  private modalContent: TemplateRef<any>;

  errorResult: ErrorResponseDto;

  constructor(private todoBEService: TodoBEService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.todoBEService.findTodoItem(this.id)
      .subscribe((data: TodoItemDto) => {
        this.todoItem = new class implements UpdateTodoItemDto {
          deadline = data.deadline !== undefined && data.deadline !== null ? new Date(data.deadline as any * 1000) : data.deadline;
          id = data.id;
          name = data.name;
          priority = data.priority;
        };
      }, error => console.log(error));
  }

  onCancel() {
    this.goToTodoItemList();
  }

  onSubmit() {
    this.todoBEService.updateTodoItem(this.id, this.todoItem)
      .subscribe(data => this.goToTodoItemList(), error => {
        console.log(error);
        this.errorResult = error.error;
        this.modalService.open(this.modalContent, {ariaLabelledBy: 'modal-basic-title'});
      });
  }

  goToTodoItemList() {
    this.router.navigate(['/todo-items']);
  }
}
