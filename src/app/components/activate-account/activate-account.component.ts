import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  isSuccess = false
  private token : any

  isErrorTokenExpired = false
  isErrorAccountAlreadyActivated = false

  errorMessage: any

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private userService : UserService,
    private translateService : TranslateService
    ) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('token')
    if (this.token === null) {
      this.router.navigate(['/login'])
      return
    }
    this.activatedAccount()
  }

  private activatedAccount() {
    let that = this
    this.userService.activateAccount(this.token).subscribe({
      next() {
        that.isSuccess = true
      },
      error(error) {
        console.log(error)

        let code = error.error.error

        that.translateService.get(code, {}).subscribe((res: string) => {
          that.errorMessage = res;
        })
        if (code === 'user.activate.already') {
          that.isSuccess = false
          that.isErrorAccountAlreadyActivated = true

        } else if (code === 'user.activate.token.expire') {
          that.isSuccess = false
          that.isErrorTokenExpired = true

        } else {
          that.isSuccess = false
        }

      }
    })
  }

  resendActivationEmail() {
    this.userService.resendActivationEmail(this.token).subscribe({
      next() {

      },
      error(error) {
        console.log(error);
      }
    })
  }

  navigateToLoginPage() {
    this.router.navigate(['/login'])
  }

}
