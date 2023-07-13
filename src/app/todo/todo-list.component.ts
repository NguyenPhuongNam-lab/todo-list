import { Component, OnInit } from '@angular/core';
import { ITodo, StorageItemKey } from '../model';
import { StorageService } from '../service';
import { todoList } from '../data';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todoList?: ITodo[];

  public selectedRows: ITodo[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    /**
     * Initialize data
     */
    this.storageService.setItem(StorageItemKey.initializeData, todoList);
    this.getData();
  }

  /**
   * Handle task selected
   * Add/remove task selected in list selectedRow
   *
   * @param todo - ITodo
   */
  public onRowSelection(todo: ITodo) {
    if (todo.isChecked) {
      this.selectedRows.push(todo);
    } else {
      this.selectedRows = this.selectedRows.filter((row) => row.id !== todo.id);
    }
  }

  /**
   * Get list todo
   */
  public getData() {
    this.todoList = this.sortDataByDueDate(
      this.storageService
        .findItem<ITodo[], []>(StorageItemKey.initializeData, [])
        .map((item) => {
          return {
            ...item,
            isChecked: false,
          };
        })
    );
  }

  /**
   * Search list task exist by title
   *
   * @param title - string
   */
  public searchData(title: string) {
    const storageValue: ITodo[] = this.storageService.findItem(
      StorageItemKey.initializeData,
      []
    );
    if (title) {
      this.todoList = storageValue?.filter(
        (todo) =>
          todo.title.trim().toLowerCase() === title.trim().toLowerCase() ||
          todo.title.toLowerCase().includes(title.trim().toLowerCase())
      );
    } else {
      this.todoList = storageValue;
    }
  }

  /**
   * Remove a task from todo list by click remove in each row and set to localStorage
   *
   * @param data - ITodo
   */
  public deleteTask(data: ITodo) {
    this.todoList = this.todoList?.filter((item) => item.id !== data.id);
    this.selectedRows = this.selectedRows.filter((row) => row.id !== data.id);
    this.storageService.setItem(StorageItemKey.initializeData, this.todoList);
  }

  /**
   * Remove list task by click remove button in bulk action and set to localStorage
   */
  public deleteManyTask() {
    this.todoList = this.todoList?.reduce((list: ITodo[], item: ITodo) => {
      if (this.selectedRows.every((row) => row.id !== item.id)) {
        list.push(item);
      }
      return list;
    }, []);
    this.storageService.setItem(StorageItemKey.initializeData, this.todoList);
    this.selectedRows = [];
  }

  /**
   * Sort date by dueDate
   *
   * @param data - ITodo
   * @returns - ITdo
   */
  private sortDataByDueDate(data: ITodo[]) {
    return data.sort(
      (a, b) => Number(new Date(a.dueDate)) - Number(new Date(b.dueDate))
    );
  }
}
