import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './components/users/users.component';
import {RepositoryComponent} from './components/repository/repository.component';
import {FavoritesComponent} from './components/favorites/favorites.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'repository/:login',
    component: RepositoryComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
