import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reports } from 'src/app/models/model/reports';
import { EmbeddedToken } from 'src/app/models/model/embeddedToken';
import { Report } from 'src/app/models/model/report';
import { Dashboards } from 'src/app/models/model/dashboards';
import { Dashboard, Tile } from 'powerbi-client';
import { Tiles } from 'src/app/models/model/tiles';
import { Groups } from 'src/app/models/model/groups';
import { Datasets } from 'src/app/models/model/datasets';
import { Dataset } from 'src/app/models/model/dataset';

@Injectable({
    providedIn: 'root'
})
export class PowerBIService {

    private baseUrl: string = "https://api.powerbi.com/v1.0/myorg";

    constructor(private http: HttpClient) { }

    public getEmbeddedToken(reportId: string, datasetId: string): Observable<EmbeddedToken> {
        const headers = this.getHeaders();
        let request = {
            datasets: [{ id: datasetId }],
            reports: [{ id: reportId }]
        };
        return this.http.post<EmbeddedToken>(this.baseUrl + '/GenerateToken', request, { headers: headers });
    }

    public getDashboardEmbeddedToken(groupId: string, dashboardId: string): Observable<EmbeddedToken> {
        const headers = this.getHeaders();
        let request = {
            accessLevel: "View"
        };
        return this.http.post<EmbeddedToken>(this.baseUrl + '/groups/' + groupId + '/dashboards/' + dashboardId + '/GenerateToken', request, { headers: headers });
    }

    public getReportEmbeddedToken(groupId: string, reportId: string): Observable<EmbeddedToken> {
        const headers = this.getHeaders();
        let request = {
            accessLevel: "View"
        };
        return this.http.post<EmbeddedToken>(this.baseUrl + '/groups/' + groupId + '/reports/' + reportId + '/GenerateToken', request, { headers: headers });
    }

    public getDatasetEmbeddedToken(groupId: string, datasetId: string): Observable<EmbeddedToken> {
        const headers = this.getHeaders();
        let request = {
            accessLevel: "View"
        };
        return this.http.post<EmbeddedToken>(this.baseUrl + '/groups/' + groupId + '/datasets/' + datasetId + '/GenerateToken', request, { headers: headers });
    }

    public getTileEmbeddedToken(groupId: string, dashboardId: string, tileId: string): Observable<EmbeddedToken> {
        const headers = this.getHeaders();
        let request = {
            accessLevel: "View"
        };
        return this.http.post<EmbeddedToken>(this.baseUrl + '/groups/' + groupId + '/dashboards/' + dashboardId + '/tiles/' + tileId + '/GenerateToken', request, { headers: headers });
    }

    public getGroups(): Observable<Groups> {
        const headers = this.getHeaders();
        return this.http.get<Groups>(this.baseUrl + '/groups', { headers: headers });
    }

    public getReports(groupId: string): Observable<Reports> {
        const headers = this.getHeaders();
        return this.http.get<Reports>(this.baseUrl + '/groups/' + groupId + '/reports', { headers: headers });
    }

    public getReport(reportId: string): Observable<Report> {
        const headers = this.getHeaders();
        return this.http.get<Report>(this.baseUrl + '/reports/' + reportId, { headers: headers });
    }

    public getDatasets(groupId: string): Observable<Datasets> {
        const headers = this.getHeaders();
        return this.http.get<Datasets>(this.baseUrl + '/groups/' + groupId + '/datasets', { headers: headers });
    }

    public getDataset(datasetId: string): Observable<Dataset> {
        const headers = this.getHeaders();
        return this.http.get<Dataset>(this.baseUrl + '/datasets/' + datasetId, { headers: headers });
    }

    public getDashboards(groupId: string): Observable<Dashboards> {
        const headers = this.getHeaders();
        return this.http.get<Dashboards>(this.baseUrl + '/groups/' + groupId + '/dashboards', { headers: headers });
    }

    public getDashboard(dashboardId: string): Observable<Dashboard> {
        const headers = this.getHeaders();
        return this.http.get<Dashboard>(this.baseUrl + '/dashboards/' + dashboardId, { headers: headers });
    }

    public getTiles(groupId: string, dashboardId: string): Observable<Tiles> {
        const headers = this.getHeaders();
        return this.http.get<Tiles>(this.baseUrl + '/groups/' + groupId + '/dashboards/' + dashboardId + '/tiles', { headers: headers });
    }

    public getTile(dashboardId: string, tileId: string): Observable<Tile> {
        const headers = this.getHeaders();
        return this.http.get<Tile>(this.baseUrl + '/dashboards/' + dashboardId + '/tiles/' + tileId, { headers: headers });
    }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
    }

}