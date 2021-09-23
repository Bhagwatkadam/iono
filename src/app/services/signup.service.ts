import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonServiceService } from './common-service.service';

const jsonTempalte = {
  "dashboard": {
    "__inputs": [],
    "__requires": [
      {
        "type": "grafana",
        "id": "grafana",
        "name": "Grafana",
        "version": "8.1.2"
      },
      {
        "type": "panel",
        "id": "stat",
        "name": "Stat",
        "version": ""
      }
    ],
    "annotations": {
      "list": [
        {
          "builtIn": 1,
          "datasource": "-- Grafana --",
          "enable": true,
          "hide": true,
          "iconColor": "rgba(0, 211, 255, 1)",
          "name": "Annotations & Alerts",
          "target": {
            "limit": 100,
            "matchAny": false,
            "tags": [],
            "type": "dashboard"
          },
          "type": "dashboard"
        }
      ]
    },
    "editable": true,
    "gnetId": null,
    "graphTooltip": 0,
    "id": null,
    "links": [],
    "panels": [
      {
        "datasource": null,
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "thresholds"
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            }
          },
          "overrides": []
        },
        "gridPos": {
          "h": 9,
          "w": 12,
          "x": 0,
          "y": 0
        },
        "id": 2,
        "options": {
          "colorMode": "value",
          "graphMode": "area",
          "justifyMode": "auto",
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "",
            "values": false
          },
          "text": {},
          "textMode": "auto"
        },
        "pluginVersion": "8.1.2",
        "targets": [
          {
            "queryType": "randomWalk",
            "refId": "A"
          }
        ],
        "title": "Panel Title",
        "type": "stat"
      }
    ],
    "schemaVersion": 30,
    "style": "dark",
    "tags": [],
    "templating": {
      "list": []
    },
    "time": {
      "from": "now-6h",
      "to": "now"
    },
    "timepicker": {},
    "timezone": "",
    "title": "dashboard",
    "uid": "null",
    "version": 0
  }
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  grafanaUrl: string = '';// environment.grafana;
  metadata_DB:string = environment.metadata_DB
  influxdb_DB:string = environment.influxdb_DB
  sources: string = "";
  constructor(private commonService: CommonServiceService,
    private httpClient: HttpClient) { }

  createOrg(data: any) {
    // let org = data.organization + " Org."
    const organization = { "name": data.organization }
    return this.httpClient.post('/api/orgs', organization);
  }

  signupUser(data: any) {
    return this.httpClient.post('/api/admin/users', data);
  }

  signupAdminUser(orgId: number, data: any) {
    //const email = data.email.split('@')[0]+"_admin@"+data.email.split('@')[1];
    const email = data.organization + "_" + orgId + "@.gamil.com";
    const login = data.organization.split(' ')[0] + "_" + orgId;
    const userDetails = { "name": data.organization, "email": email, "login": login, "password": "Welcome2021" }
    return this.httpClient.post('/api/admin/users', userDetails);
  }

  asignOrgToUser(orgId: number, data: any) {
    const organizationUser = { "loginOrEmail": data.login, "role": "Editor" }
    return this.httpClient.post('/api/orgs/' + orgId + '/users/', organizationUser);
  }

  asignOrgToAdminUser(orgId: number, data: any) {
    const login = data.organization.split(' ')[0] + "_" + orgId;
    const organization = { "loginOrEmail": login, "role": "Admin" }
    return this.httpClient.post('/api/orgs/' + orgId + '/users/', organization);
  }

  removeOrg(userId: number) {
    return this.httpClient.delete('/api/orgs/1/users/' + userId);
  }

  changeUserAdminRole(userId: number, orgId: number) {
    return this.httpClient.patch('/api/orgs/' + orgId + '/users/' + userId, { "role": "Admin" });
  }

  createDatabase(data: any, orgId: number) {
    const orgName =data.organization.split(" ")[0];
    return this.httpClient.post('/query?q=CREATE+DATABASE+'+orgName,"");
  }

  createPostgresDatasources(data: any, orgId: number) {
    this.sources = data.organization + "_metadata_DB";
    const datasources = { "name": this.sources, "type": "postgres", "url": this.metadata_DB, "access": "proxy", "basicAuth": false }
    return this.httpClient.post('/api/datasources', datasources);
  }

  createInfluxDatasources(data: any, orgId: number) {
    this.sources = data.organization + "_telemetry_data_DB";
    const datasources = { "name": this.sources, "type": "influxdb", "url": this.influxdb_DB, "access": "proxy", "basicAuth": false }
    return this.httpClient.post('/api/datasources', datasources);
  }
  
  assignTemplate(user: string, orgId: any) {
    const importData = jsonTempalte;
    let userUID = user.split(' ')[0] + "_dashboard";
    importData.dashboard.uid = userUID;
    return this.httpClient.post('/api/dashboards/db', importData);
  }

}
