import { Component, OnInit } from '@angular/core';
import { Todo, TodoData } from 'src/app/todo';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];
  todoName: string = '';
  editMode: boolean[] = [];
  newTodo: any = '';

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.homeService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        console.log('Daftar todos');
        console.log(todos);

        for (let i = 0; i < todos.length; i++) {
          this.editMode.push(false);
        }
      },

      error: (error) => {
        console.log('Error print todos');
        console.log(error);
      },
    });
  }

  addTodo() {
    console.log('new todo ', this.newTodo);

    if (this.newTodo === '') {
      return;
    } else {
      const newTodoData: TodoData = {
        isCompleted: false,
        text: this.newTodo,
      };

      this.homeService.addTodo(newTodoData).subscribe({
        next: (response) => {
          console.log(response);
          this.ngOnInit();
          this.newTodo = '';
        },

        error: (error) => {
          console.log('Error print todos');
          console.log(error);
        },
      });
    }
  }

  checkTodo(index: number) {
    console.log('update todo', index);

    const id = this.todos[index]._id;

    const todoData: TodoData = {
      isCompleted: !this.todos[index].isCompleted,
      text: this.todos[index].text,
    };

    this.homeService.updateTodo(todoData, id).subscribe({
      next: (response) => {
        console.log(response);
        this.ngOnInit();
      },

      error: (error) => {
        console.log('Error print todos');
        console.log(error);
      },
    });
  }

  editTodo(index: number) {
    if (this.editMode[index] === false) {
      this.editMode[index] = true;
      console.log('Edit == false');
    } else if (this.editMode[index] === true) {
      const id = this.todos[index]._id;

      const todoData: TodoData = {
        isCompleted: this.todos[index].isCompleted,
        text: this.todos[index].text,
      };

      this.homeService.updateTodo(todoData, id).subscribe({
        next: (response) => {
          console.log(response);
          this.ngOnInit();
        },

        error: (error) => {
          console.log('Error print todos');
          console.log(error);
        },
      });
      this.editMode[index] = false;
    }
  }

  deleteTodo(id: string) {
    this.homeService.deleteTodo(id).subscribe({
      next: (response) => {
        console.log(response);
        this.ngOnInit();
      },

      error: (error) => {
        console.log('Error delete todos');
        console.log(error);
      },
    });
  }
}
