import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {UsersService} from '../../services/users.service';
import {RepositoryService} from '../../services/repository.service';
import {ModalComponent} from '../../shared/modal/modal.component';
import {IRepository} from '../../interface/repository';

@Component({
  selector: 'app-repos',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  userRepo$: Observable<IRepository[]>;
  login: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private repositoryService: RepositoryService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.login = params.login;
      this.userRepo$ = this.userService.getUserRepo(params.login);
    });
  }

  openModalRepo(repo: IRepository, $event) {
    $event.target.tagName !== 'MAT-ICON' ? this.dialog.open(ModalComponent, {data: repo}) : this.checkRepo(repo);
  }

  checkRepo(repo: IRepository) {
    this.showFavoriteRepository(repo) ? this.repositoryService.removeRepository(repo.id) : this.repositoryService.addRepository(repo);
  }

  showFavoriteRepository(repo: IRepository) {
    return this.repositoryService.getRepository().map(r => r.id).indexOf(repo.id) >= 0;
  }

  goFavoritesPage() {
    this.router.navigate(['favorites']);
  }

  goUsersPage() {
    this.router.navigate(['']);
  }
}
