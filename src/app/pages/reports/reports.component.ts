import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/service/auth.service';
import { PowerBIService } from 'src/app/services/service/powerbi.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public groups?: any[];
  public groupId?: string;
  public reports?: any[];

  constructor(private authService: AuthService,
    private powerbiService: PowerBIService,
    private router: Router) {
  }

  async ngOnInit() {
    await this.authService.handleActiveAccount();
    this.powerbiService.getGroups().subscribe(groups => this.groups = groups?.value);
  }

  async showReports() {
    try {
      if(this.groupId != undefined) {
       let response = await this.powerbiService.getReports(this.groupId).toPromise();
       this.reports = response?.value;
      } else {
        this.reports = undefined;
      }
    } catch(error) {
      this.reports = undefined;
    }
  }

  showReport(reportId: string) {
    this.router.navigate(['/app/group', this.groupId, 'report', reportId]);
  }

}
