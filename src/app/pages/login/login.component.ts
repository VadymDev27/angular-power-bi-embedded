import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    await this.authService.handleActiveAccount();
    this.authService.isActiveAccount();
  }

  login() {
    this.authService.loginPopup();
  }

}
