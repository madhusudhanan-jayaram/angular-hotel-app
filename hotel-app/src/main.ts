// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient }    from '@angular/common/http';
import { AppComponent }         from './app/app.component';
import { appConfig }            from './app/app.config';

bootstrapApplication(AppComponent, {
  // Spread in your existing ApplicationConfig…
  ...appConfig,
  // …but prepend provideHttpClient() to the providers array
  providers: [
    provideHttpClient(),
    ...(appConfig.providers ?? [])
  ]
});