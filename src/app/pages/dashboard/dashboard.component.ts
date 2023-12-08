import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { models } from 'powerbi-client';
import { AuthService } from 'src/app/services/service/auth.service';
import { PowerBIService } from 'src/app/services/service/powerbi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public dashboardId?: string;
  public groupId?: string;
  public embededToken?: any;
  public hasError: boolean = false;
  public inProgress: boolean = true;

  public powerbiDashboard: any = {
    embedConfig: null,
    cssClassName: "reportClass",
    phasedEmbedding: false,
    eventHandlers: new Map([
      ['loaded', () => console.log('Report loaded')],
      ['rendered', () => console.log('Report rendered')],
      ['error', (event: any) => console.log(event.detail)]
    ])
  }

  constructor(private authService: AuthService,
    private powerbiService: PowerBIService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.groupId = params['groupId'];
      this.dashboardId = params['dashboardId'];
    });
  }

  async ngOnInit() {
    await this.authService.handleActiveAccount();
    if (this.groupId && this.dashboardId) {
      try {
        this.powerbiDashboard.embedConfig = null;
        this.hasError = false;
        this.embededToken = await this.powerbiService.getDashboardEmbeddedToken(this.groupId, this.dashboardId).toPromise();
        this.showDashboard(this.dashboardId, this.embededToken?.token);
      } catch (error) {
        console.log(error);
        this.inProgress = false;
      }
    }
  }

  async showDashboard(dashboardId?: string, accessToken?: string) {
    this.powerbiDashboard.embedConfig = {
      type: 'dashboard',
      id: dashboardId,
      embedUrl: "https://app.powerbi.com/dashboardEmbed?dashboardId=" + dashboardId,
      accessToken: accessToken,
      tokenType: models.TokenType.Embed,
      pageView: 'fitToWidth'
    };
    this.inProgress = false;
  }

}
