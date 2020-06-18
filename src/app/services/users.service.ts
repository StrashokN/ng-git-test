import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IUser} from '../interface/user';
import {IRepository} from '../interface/repository';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<IUser[]>('https://api.github.com/users');
  }

  getUser(username: string) {
    return this.http.get<IUser[] | any>(`https://api.github.com/search/users?q=${username}`);
  }

  getUserRepo(login: string) {
    return this.http.get<IRepository[]>(`https://api.github.com/users/${login}/repos`);
  }
}

