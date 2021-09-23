import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor() { }
  isOpen: boolean = true;
  events: string[] = [];
  opened: boolean = true;

  toggle() {
    this.opened = !this.opened;
    console.log(this.opened);
  }

  ngOnInit() {
    $(".mat-content").click(function () {
      let screenSize = window.screen.width;
      if (screenSize < 768 && $("body").hasClass("open-menu")) {
        $("body").removeClass("open-menu");
      }
    })
  }

}
