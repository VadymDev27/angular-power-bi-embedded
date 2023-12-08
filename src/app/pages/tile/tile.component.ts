import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { models } from 'powerbi-client';
import { AuthService } from 'src/app/services/service/auth.service';
import { PowerBIService } from 'src/app/services/service/powerbi.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  public tileId?: string;
  public dashboardId?: string;
  public groupId?: string;
  public embededToken?: any;
  public hasError: boolean = false;
  public inProgress: boolean = true;

  public powerbiTile: any = {
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
      this.tileId = params['tileId'];
    });
  }

  async ngOnInit() {
    await this.authService.handleActiveAccount();
    if (this.groupId && this.dashboardId && this.tileId) {
      try {
        this.powerbiTile.embedConfig = null;
        this.hasError = false;
        this.embededToken = await this.powerbiService.getTileEmbeddedToken(this.groupId, this.dashboardId, this.tileId).toPromise();
        this.showTile(this.tileId, this.embededToken?.token);
      } catch (error) {
        console.log(error);
        this.inProgress = false;
      }
    }
  }

  async showTile(tileId?: string, accessToken?: string) {
    this.powerbiTile.embedConfig = {
      type: 'tile',
      id: tileId,
      dashboardId: this.dashboardId,
      embedUrl: "https://app.powerbi.com/embed?dashboardId=" + this.dashboardId + "&tileId=" + tileId,
      accessToken: accessToken,
      tokenType: models.TokenType.Embed
    };
    this.inProgress = false;
  }

}
