import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppCookieService } from 'src/app/service/app-cookie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private appCookieService : AppCookieService,
    private router : Router,
    private translateService : TranslateService
  )
  {
    this.translateService.setDefaultLang('en')
  }

  ngOnInit(): void {
  }

  doLogout() {
    this.appCookieService.deleteAccessToken()
    this.router.navigate(['/login'])
  }

  swithToThai() {
    this.translateService.use('th')
  }

  swithToEnglish() {
    this.translateService.use('en')
  }

}
