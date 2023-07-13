import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo/todo-list.component';
import { CreateComponent } from './todo/create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './todo/todo/todo.component';

@NgModule({
  declarations: [AppComponent, TodoListComponent, CreateComponent, TodoComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
