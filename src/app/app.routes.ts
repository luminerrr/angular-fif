import { Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { UserTableComponent } from './pages/user-table/user-table.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: UserTableComponent},
    {path: 'add', component: FormComponent},
    {path: 'edit/:id', component: FormComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];
