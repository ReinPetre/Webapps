import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Http, Response, Headers } from '@angular/http';
import { Todo } from '../models/todo';

@Injectable()
export class TodoService {

  private _url = "/todos"
  private _todos;

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService
  ) { }

  getTodosFromProject(projectId)
  {
    return this.http.get(`${this._url}/project/${projectId}`, { headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})})
    .map(response => response.json().map(item => Todo.fromJSON(item)));
  }

  addTodoToProject(projectid, todo: Todo)
  {
    return this.http.post(`${this._url}/project/${projectid}`, todo, { headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`}) })
    .map(res => res.json());
  }

  deleteTodoFromProject(projectId, todo: Todo)
  {
    return this.http.delete(`${this._url}/${projectId}/${todo.id}`, { headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`}) })
    .map(res => res.json());
  }

  updateTodo(todo: Todo)
  {
    console.log("TodoService was reached");
    return this.http.post(`${this._url}/${todo.id}`, todo, { headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`}) })
    .map(res => res.json());
  }

}
