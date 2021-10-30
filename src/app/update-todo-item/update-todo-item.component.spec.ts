import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTodoItemComponent } from './update-todo-item.component';

describe('UpdateTodoItemComponent', () => {
  let component: UpdateTodoItemComponent;
  let fixture: ComponentFixture<UpdateTodoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTodoItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
