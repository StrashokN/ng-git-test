import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RepositoryService} from '../../services/repository.service';
import {IRepository} from '../../interface/repository';
import {ModalComponent} from '../../shared/modal/modal.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favoriteRepositories: IRepository[] = [];

  constructor(
    private router: Router,
    private repositoryService: RepositoryService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.showFavoriteRepository();
  }

  openModalRepo(repo: IRepository, $event) {
    $event.target.tagName !== 'MAT-ICON' ? this.dialog.open(ModalComponent, {data: repo}) : this.removeRepository(repo);
  }

  showFavoriteRepository() {
    this.favoriteRepositories = this.repositoryService.getRepository();
  }

  removeRepository(repo: IRepository) {
    this.repositoryService.removeRepository(repo.id);
    this.showFavoriteRepository();
  }

  goUsersPage() {
    this.router.navigate(['']);
  }
}
