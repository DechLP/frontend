import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from './components/header/header.component';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    ActivateAccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
    }
  })
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
