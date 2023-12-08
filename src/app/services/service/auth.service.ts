import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private msalService: MsalService,
    private router: Router) { }

  public async handleActiveAccount() {
    let response = await this.msalService.instance.handleRedirectPromise();
    if(response != null && response.account != null) {
      this.msalService.instance.setActiveAccount(response.account);
    }
  }

  public isActiveAccount() {
    if (this.msalService.instance.getActiveAccount() != null) {
      this.router.navigate(['/app/home']);
    }
  }

  public loginPopup() {
    sessionStorage.clear();
    const scopes = ['https://analysis.windows.net/powerbi/api/.default'];
    this.msalService.acquireTokenPopup({ scopes })
      .subscribe((response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account);
        localStorage.setItem('token', response.accessToken);
        this.router.navigate(['/app/home']);
      });
  }

  public logout(status?: boolean) {
    if(status) {
      localStorage.removeItem('token');
      const activeAccount = this.msalService.instance.getActiveAccount();
      if (activeAccount != null) {
        const logoutHint = activeAccount.idTokenClaims?.login_hint;
        this.msalService.logoutRedirect({ 
          account: activeAccount, 
          logoutHint: logoutHint 
        });
      } else {
        this.msalService.logout();
      }
    }
  }

}
