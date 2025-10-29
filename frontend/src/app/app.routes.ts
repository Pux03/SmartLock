import { Routes } from '@angular/router';
import { Login } from './shared/components/login/login';
import { Register } from './shared/components/register/register';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { Company } from './shared/components/company/company';
import { Unauthorized } from './shared/components/unauthorized/unauthorized';
import { User } from './shared/components/user/user';

export const routes: Routes = [
    { path: '', redirectTo: "/login", pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'super-admin', component: Register, canActivate: [RoleGuard], data: { role: 'SUPER_ADMIN' } },
    {
        path: 'company',
        component: Company, // TODO: Replace with actual Company component when created
        canActivate: [RoleGuard, AuthGuard],
        data: { role: 'ADMIN' },
    },
    { path: 'user', component: User, canActivate: [RoleGuard, AuthGuard], data: { role: 'USER' } },
    { path: 'unauthorized', component: Unauthorized },
];
