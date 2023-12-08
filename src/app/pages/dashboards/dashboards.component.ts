import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/service/auth.service';
import { PowerBIService } from 'src/app/services/service/powerbi.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

  public groups?: any[];
  public groupId?: string;
  public dashboards?: any[];

  constructor(private authService: AuthService,
    private powerbiService: PowerBIService,
    private router: Router) { }

    async ngOnInit() {
      await this.authService.handleActiveAccount();
      this.powerbiService.getGroups().subscribe(groups => this.groups = groups?.value);
    }

    async showDashboards() {
      try {
        if(this.groupId != undefined) {
         let response = await this.powerbiService.getDashboards(this.groupId).toPromise();
         this.dashboards = response?.value;
        } else {
          this.dashboards = undefined;
        }
      } catch(error) {
        this.dashboards = undefined;
      }
    }

    showDashboard(dashboardId: string) {
      this.router.navigate(['/app/group', this.groupId, 'dashboard', dashboardId]);
    }

    showTiles(dashboardId: string) {
      this.router.navigate(['/app/group', this.groupId, 'dashboard', dashboardId, 'tiles']);
    }

}
