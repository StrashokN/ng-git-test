import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable, Subscription, throwError} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {UsersService} from '../../services/users.service';
import {IUser} from '../../interface/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<IUser[]>;
  searchValueControl = new FormControl();
  formCtrlSub: Subscription;
  errorMessage: string = '';

  constructor(private router: Router, private userService: UsersService) {
  }

  ngOnInit() {
    this.users$ = this.userService.getAllUsers();
    this.formCtrlSub = this.searchValueControl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe(this.userChange);
  }

  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
  }

  private userChange = (user: string) => {
    this.errorMessage = '';
    if (user) {
      this.users$ = this.userService.getUser(user.trim())
        .pipe(
          map((resp) => resp.items),
          catchError(this.handleError)
        );
    } else {
      this.users$ = this.userService.getAllUsers();
    }
  }

  private handleError = (err) => {
    this.errorMessage = err.error.message;
    return throwError(err);
  }

  goRepoPage(login: string) {
    this.router.navigate([`repository/${login}`]);
  }

  goFavoritesPage() {
    this.router.navigate(['favorites']);
  }
}
