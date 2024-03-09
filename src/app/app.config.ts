import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { studentReducer } from './store/students/students.reducer';
import { StudentsEffects } from './store/students/students.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideStore(),
    provideState({name: 'students', reducer: studentReducer}),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), 
    provideEffects([StudentsEffects]),
    importProvidersFrom(HttpClientModule)
  ]
};
