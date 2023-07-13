import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from 'src/app/model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todoInput!: ITodo;
  @Output() rowSelection = new EventEmitter<ITodo>();
  @Output() confirmClicked = new EventEmitter<void>();
  @Output() removeClicked = new EventEmitter<ITodo>();

  public isEdit = false;

  /**
   * Show/hide operation button  when check/uncheck checkbox
   * When uncheck checkbox, hide screen edit
   */
  public onChange() {
    this.todoInput.isChecked = !this.todoInput.isChecked;
    this.rowSelection.emit(this.todoInput);
    this.isEdit = false;
  }

  /**
   * Show/hide screen edit task
   */
  public onDetailClick() {
    this.isEdit = !this.isEdit;
  }
}
