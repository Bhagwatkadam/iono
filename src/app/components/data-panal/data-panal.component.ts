import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { element } from 'protractor';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-data-panal',
  templateUrl: './data-panal.component.html',
  styleUrls: ['./data-panal.component.css']
})
export class DataPanalComponent implements OnInit {
  showIframe: boolean = true;
  grafanaUrl: any = environment.grafana;

  @ViewChild('iframe', { static: true }) iframe: ElementRef;

  srcDocContent: string = "";
  constructor(private sanitized: DomSanitizer) { }

  ngOnInit(): void {
    let name = sessionStorage.getItem('name').split("_")[0] || "";
    name = name.split(" ")[0];
    let grafanaUrl = this.grafanaUrl + "/d/" + name + "_dashboard/dashboard?orgId=" + sessionStorage.getItem('orgId');
    this.grafanaUrl = this.sanitized.bypassSecurityTrustUrl(grafanaUrl);
    this.grafanaUrl = this.grafanaUrl.changingThisBreaksApplicationSecurity;
    this.showIframe = true;
  }
}
