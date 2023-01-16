import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient} from '@angular/common/http';
import {enableProdMode, importProvidersFrom} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Interceptor} from '@shared/loader/interceptors/interceptor.service';
import {ToastrModule} from 'ngx-toastr';

import {routes} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// use for DateLocalePipe
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeNl from '@angular/common/locales/nl';
import {provideAnimations} from '@angular/platform-browser/animations';

registerLocaleData(localeFr);
registerLocaleData(localeNl);

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true
    })),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })),
    Interceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
})
  .catch((err) => console.error(err));
