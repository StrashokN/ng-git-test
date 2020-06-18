import { Injectable } from '@angular/core';
import { IRepository } from '../interface/repository';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  repositories: IRepository[] = [];

  constructor() { }

  getRepository(): IRepository[] {
    this.repositories = JSON.parse(localStorage.getItem('repository')) || [];
    return this.repositories;
  }

  addRepository(repo: IRepository) {
    this.repositories.push(repo);
    localStorage.setItem('repository', JSON.stringify(this.repositories));
  }

  removeRepository(id: number) {
    this.repositories = this.repositories.filter(repo => repo.id !== id);
    localStorage.setItem('repository', JSON.stringify(this.repositories));
  }
}
