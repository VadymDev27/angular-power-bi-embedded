import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() logoutActived = new EventEmitter<boolean>();
  
  public username?: string;

  constructor(private msalService: MsalService) { }

  ngOnInit(): void {
    let account = this.msalService.instance.getActiveAccount();
    this.username = account?.name;
  }

  logout() {
    this.logoutActived.emit(true);
  }

}
