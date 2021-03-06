import { enableProdMode, provide } from '@angular/core';
import {
  HTTP_PROVIDERS,
  RequestOptions,
  XHRBackend
} from '@angular/http';
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AuthHttp, AuthService } from './app/shared';

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  provide(AuthHttp, {
    useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, authService: AuthService) => {
      return new AuthHttp(backend, defaultOptions, authService);
    },
    deps: [ XHRBackend, RequestOptions, AuthService ]
  }),
  AuthService,
  provideRouter(routes)
]);
