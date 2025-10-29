import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './store/auth/auth.reducer';
import { companyReducer } from './store/company/company.reducer';
import { lockerGroupReducer } from './store/locker-group/locker-group.reducer';
import { userReducer } from './store/user/user.reducer';
import { lockerReducer } from './store/locker/locker.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { CompanyEffects } from './store/company/company.effects';
import { LockerGroupEffects } from './store/locker-group/locker-group.effects';
import { UserEffects } from './store/user/user.effects';
import { LockerEffects } from './store/locker/locker.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ auth: authReducer, company: companyReducer, lockerGroup: lockerGroupReducer, user: userReducer, locker: lockerReducer }),
    provideEffects([AuthEffects, CompanyEffects, LockerGroupEffects, UserEffects, LockerEffects]),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
