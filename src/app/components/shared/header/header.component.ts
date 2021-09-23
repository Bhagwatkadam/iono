import { Component, Input, OnInit, SimpleChange } from '@angular/core';
// import {CookieService} from 'angular2-cookie/core';
declare var $: any;
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Input()
  showHead: any = false;
  isLoggedIn$: Observable<boolean>;
  constructor(
    private router: Router,
    // private cookieService:CookieService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userDetailsById();
    this.isLoggedIn$ = this.authService.isLoggedIn;
    let screenSize = window.screen.width;
    if (screenSize < 768) {
      $("body").removeClass("open-menu");
    }
    $(".navbar-toggle").click(function (event) {
      event.stopImmediatePropagation();
      $("body").toggleClass("open-menu");
    })
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    // Extract changes to the input property by its name
    let change: SimpleChange = changes['showHead'];
    console.log('changed', changes, change);
    // Whenever the data in the parent changes, this method gets triggered. You 
    // can act on the changes here. You will have both the previous value and the 
    // current value here.
  }

  userDetails: any = {};
  userdetailsById: any = [];
  userDetailsById() {
    // this.userDetails = this.cookieService.getObject('loginResponce');
    this.userService.getUserById(sessionStorage.getItem('user_Id')).subscribe((resp: any) => {
      this.userdetailsById = resp;
     // sessionStorage.setItem('name', resp.name)
    }
    )
  }

  getName() {
    return sessionStorage.getItem('name');
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/client-login']);
  }
}
