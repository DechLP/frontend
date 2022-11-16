import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interface/login-response';
import { RegisterResponse } from '../interface/register-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: string, password : string) : Observable<LoginResponse> {
    let url = 'http://localhost:8080/user/login'
    let body = {
      email: email,
      password : password
    }
    return this.http.post<LoginResponse>(url, body)
  }

  Register(email: string, password : string, name : string) : Observable<RegisterResponse> {
    let url = 'http://localhost:8080/user/register'
    let body = {
      email: email,
      password : password,
      name : name
    }
    return this.http.post<RegisterResponse>(url, body)
  }

  activateAccount(token: string) : Observable<any> {
    let url = 'http://localhost:8080/user/activate'
    let body = {
      token: token
    }
    return this.http.post<any>(url, body)
  }

  resendActivationEmail(token :string) {
    let url = 'http://localhost:8080/user/resend-activation-email'
    let body = {
      token: token
    }
    return this.http.post<any>(url, body)
  }

}
