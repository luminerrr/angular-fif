import { Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { UserTableComponent } from './pages/user-table/user-table.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from '../guard/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: UserTableComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: FormComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: FormComponent, canActivate: [authGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
