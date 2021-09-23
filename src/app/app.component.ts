import { Component, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CommonServiceService } from './services/common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yitsol-ivault-ux';
  showHead: boolean;
  route : any;

  constructor(private router: Router,private common:CommonServiceService) {
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          this.route = event['url'];
          if (event['url'] == '/client-login' || event['url'] == '/forgot-password') {
            this.showHead = false;
          } else {
            this.showHead = true;
          }
        }
      });
    }

    ngOnInit(){
      this.showHead = false;
      this.router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          this.route = event['url'];
          if (event['url'] == '/client-login' || event['url'] == '/forgot-password') {
            this.showHead = false;
          } else {
            this.showHead = true;
          }
        }
      });
      this.common.sessionUserEmit(this.showHead);
    }
}
