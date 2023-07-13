import { Component } from '@angular/core';
import { todoList } from './data';
import { StorageService } from './service';
import { StorageItemKey } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
