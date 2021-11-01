import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FieldFilterDto,
  FieldName,
  FilterOperation,
  Priority,
  QueryResponseDto,
  SortDirection,
  SortDto,
  TodoBEService,
  TodoItemDto
} from "../subido-fe-client";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import moment from "moment";
import { GlobalDataService } from "../global-data.service";

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
  styleUrls: ['./todo-item-list.component.css']
})
export class TodoItemListComponent implements OnInit {

  fieldNames = Object.values(FieldName);
  directions = Object.values(SortDirection);
  operations = Object.values(FilterOperation);
  priorities = Object.values(Priority);

  sortItem: SortDto = {
    fieldName: FieldName.name,
    direction: SortDirection.ASC
  }

  filterItem: FieldFilterDto = {
    fieldName: FieldName.name,
    operation: FilterOperation.EQ,
    filterValue: '...'
  };
  filterUpdate: boolean = false;
  filterUpdateIndex: number = -1;

  queryResponse: QueryResponseDto = {
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
    todoItems: new Array<TodoItemDto>(0)
  };

  @ViewChild('sortAndFilterModalContent')
  private sortAndFilterModalContent: TemplateRef<any>;
  @ViewChild('sortModalContent')
  private sortModalContent: TemplateRef<any>;
  @ViewChild('filterModalContent')
  private filterModalContent: TemplateRef<any>;

  constructor(private todoBEService: TodoBEService, private router: Router, private modalService: NgbModal, public gd: GlobalDataService) {
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
    if (this.gd.queryRequestDto.pageSize) {
      this.gd.queryRequestDto.pageNumber = n;
      this.listTodos();
    }
  }

  sortDirection(field: String) {
    let sort = this.gd.queryRequestDto.sorts?.find(s => s.fieldName === field);
    return sort ? sort.direction === SortDirection.ASC ? '+' : '-' : '';
  }

  adjustSort(field: string) {
    if (!this.gd.queryRequestDto.sorts) {
      this.gd.queryRequestDto.sorts = new Array<SortDto>();
    }
    let sort = this.gd.queryRequestDto.sorts.find(s => s.fieldName === field);
    if (sort) {
      if (sort.direction === SortDirection.ASC) {
        sort.direction = SortDirection.DESC;
      } else {
        this.gd.queryRequestDto.sorts.splice(this.gd.queryRequestDto.sorts.indexOf(sort), 1);
      }
    } else {
      this.gd.queryRequestDto.sorts = this.gd.queryRequestDto.sorts.concat({
        fieldName: field,
        direction: SortDirection.ASC
      } as SortDto);
    }
    this.listTodos();
  }

  adjustPageSize() {
    if (this.gd.queryRequestDto.pageSize && this.gd.queryRequestDto.pageSize > 0) {
      this.listTodos();
    }
  }

  private listTodos() {
    this.todoBEService.queryTodoItems(this.gd.queryRequestDto)
      .subscribe(data => this.queryResponse = data);
  }

  updateTodoItem(id: any) {
    this.router.navigate(['update-todo-item', id]);
  }

  newItemClick() {
    this.router.navigate(['create-todo-item']);
  }

  sortAndFiltersClick() {
    this.modalService.open(this.sortAndFilterModalContent).result
      .then(() => this.listTodos());
  }

  sortUpClick(index: number) {
    if (this.gd.queryRequestDto.sorts) {
      if (index > 0) {
        let s1 = this.gd.queryRequestDto.sorts[index - 1];
        this.gd.queryRequestDto.sorts[index - 1] = this.gd.queryRequestDto.sorts[index];
        this.gd.queryRequestDto.sorts[index] = s1;
      }
    }
  }

  isLast(index: number) {
    return this.gd.queryRequestDto.sorts && this.gd.queryRequestDto.sorts.length - 1 === index;
  }

  sortDownClick(index: number) {
    if (this.gd.queryRequestDto.sorts) {
      if (index < this.gd.queryRequestDto.sorts.length - 1) {
        let s1 = this.gd.queryRequestDto.sorts[index];
        this.gd.queryRequestDto.sorts[index] = this.gd.queryRequestDto.sorts[index + 1];
        this.gd.queryRequestDto.sorts[index + 1] = s1;
      }
    }
  }

  sortDeleteClick(index: number) {
    if (this.gd.queryRequestDto.sorts) {
      this.gd.queryRequestDto.sorts.splice(index, 1);
    }
  }

  newSortClick() {
    this.modalService.open(this.sortModalContent)
  }

  saveNewSort() {
    if (!this.gd.queryRequestDto.sorts) {
      this.gd.queryRequestDto.sorts = [];
    }
    this.gd.queryRequestDto.sorts = this.gd.queryRequestDto.sorts.concat({
      fieldName: this.sortItem.fieldName,
      direction: this.sortItem.direction
    } as SortDto);
  }

  newFilterClick() {
    this.filterUpdate = false;
    this.filterUpdateIndex = -1;
    this.modalService.open(this.filterModalContent)
  }

  updateFilter(index: number) {
    if (this.gd.queryRequestDto.fieldFilters) {
      this.filterUpdate = true;
      this.filterUpdateIndex = index;
      let filter: FieldFilterDto = this.gd.queryRequestDto.fieldFilters[index];
      this.filterItem.fieldName = filter.fieldName;
      this.filterItem.operation = filter.operation;
      this.filterItem.filterValue = filter.filterValue;
      this.modalService.open(this.filterModalContent);
    }
  }

  filterDeleteClick(index: number) {
    if (this.gd.queryRequestDto.fieldFilters) {
      this.gd.queryRequestDto.fieldFilters.splice(index, 1);
    }
  }

  saveNewFilter() {
    if (!this.gd.queryRequestDto.fieldFilters) {
      this.gd.queryRequestDto.fieldFilters = [];
    }
    let filter: FieldFilterDto = {
      fieldName: this.filterItem.fieldName,
      operation: this.filterItem.operation,
      filterValue:
        this.filterItem.fieldName === FieldName.deadline || this.filterItem.fieldName === FieldName.createdAt
          ? this.filterItem.filterValue === '...' ? 'null' : moment(this.filterItem.filterValue).valueOf() as unknown as string
          : this.filterItem.filterValue
    };
    if (this.filterUpdate) {
      this.gd.queryRequestDto.fieldFilters[this.filterUpdateIndex] = filter;
    } else {
      this.gd.queryRequestDto.fieldFilters = this.gd.queryRequestDto.fieldFilters.concat(filter);
    }
  }

  deleteTodoItem(id: any) {
    this.todoBEService.deleteTodoItem(id).subscribe(data => {
      console.log(data);
      this.listTodos();
    })
  }
}
