import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { formatter } from 'src/app/helper';
import { ITodo, Piority, StorageItemKey } from 'src/app/model';
import { StorageService } from 'src/app/service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {
  @Input() todo?: ITodo;
  @Output() confirmClicked = new EventEmitter<void>();

  public readonly dueDate = formatter(new Date(), 'yyyy-MM-dd');
  public readonly piorityOption = [
    { name: 'Low', value: Piority.Low },
    { name: 'Normal', value: Piority.Normal },
    { name: 'High', value: Piority.High },
  ];

  public isCreateMode = true;
  public todoForm = this.formBuilder.group({
    id: 0,
    title: ['', [Validators.required]],
    desc: '',
    dueDate: this.dueDate,
    piority: [Piority.Normal],
  });

  public initValue = this.todoForm.getRawValue();

  constructor(
    public formBuilder: FormBuilder,
    public storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this.todo) {
      this.isCreateMode = false;
      this.todoForm.patchValue(this.todo);
    }
  }

  ngOnDestroy(): void {
    this.isCreateMode = true;
  }

  public onUpdateTask() {
    const todoList: ITodo[] = this.storageService.findItem(
      StorageItemKey.initializeData,
      []
    );
    const data = this.todoForm.getRawValue();

    if (this.isCreateMode) {
      data.id = Math.max(...todoList.map((item) => item.id)) + 1;
      todoList.push(data as ITodo);

      this.todoForm.reset(this.initValue);
    } else {
      for (let index = 0; index < todoList.length; index++) {
        if (todoList[index] !== null && todoList[index].id === data.id) {
          todoList[index] = data as ITodo;
        }
      }
    }

    this.storageService.setItem(StorageItemKey.initializeData, todoList);
    this.confirmClicked.emit();
  }
}
