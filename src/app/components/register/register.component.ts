import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    if (this.registerFormGroup.invalid) {
      return
    }
    let name = this.registerFormGroup.controls['name'].value
    let email = this.registerFormGroup.controls['email'].value
    let password = this.registerFormGroup.controls['password'].value
    let that = this
    this.userService.Register(email, password, name).subscribe({
      next(response) {
        console.log(response);
        that.router.navigate(['/login'])
      },
      error(error) {
        alert(error.error.error)
      }
    })
  }

}
