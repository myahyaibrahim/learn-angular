import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoData } from 'src/app/todo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  getTodos(): Observable<any> {
    const url = environment.baseURL;
    return this.httpClient.get(url);
  }

  updateTodo(todoData: TodoData, id: string): Observable<any> {
    const url = environment.baseURL + '/put/' + id;
    return this.httpClient.put(url, todoData);
  }

  addTodo(todoData: TodoData): Observable<any> {
    const url = environment.baseURL + '/post';
    return this.httpClient.post(url, todoData);
  }

  deleteTodo(id: string): Observable<any> {
    const url = environment.baseURL + '/delete/' + id;
    return this.httpClient.delete(url);
  }
}
