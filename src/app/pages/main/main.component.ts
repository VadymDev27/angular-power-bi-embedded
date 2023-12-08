import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/service/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private authService: AuthService) { }

  logout(status: boolean) {
    this.authService.logout(status);
  }

}
