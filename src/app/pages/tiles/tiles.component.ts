import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/service/auth.service';
import { PowerBIService } from 'src/app/services/service/powerbi.service';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.css']
})
export class TilesComponent implements OnInit {

  public groupId?: string;
  public dashboardId?: string;
  public tiles?: any[];

  constructor(private authService: AuthService,
    private powerbiService: PowerBIService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe(params => {
      this.groupId = params['groupId'];
      this.dashboardId = params['dashboardId'];
    });
  }

  async ngOnInit() {
    await this.authService.handleActiveAccount();
    if (this.groupId && this.dashboardId) {
      try {
        let response = await this.powerbiService.getTiles(this.groupId, this.dashboardId).toPromise();
        this.tiles = response?.value;
      } catch (error) {
        console.log(error);
      }
    }
  }

  showTile(tileId: string) {
    this.router.navigate(['/app/group', this.groupId, 'dashboard', this.dashboardId, 'tile', tileId]);
  }

}
