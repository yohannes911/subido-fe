import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Priority, TodoBEService, TodoItemDto, UpdateTodoItemDto } from "../subido-fe-client";

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

  constructor(private todoBEService: TodoBEService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.todoBEService.findTodoItem(this.id).subscribe((data: TodoItemDto) => {
      this.todoItem = new class implements UpdateTodoItemDto {
        deadline = data.deadline;
        id = data.id;
        name = data.name;
        priority = data.priority;
      };
    }, error => console.log(error));
  }

  onSubmit() {
    this.todoBEService.updateTodoItem(this.id, this.todoItem).subscribe(data => {
        this.goToTodoItemList();
      }
      , error => console.log(error));
  }

  goToTodoItemList() {
    this.router.navigate(['/todo-items']);
  }
}
