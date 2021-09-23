import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { IdentityService } from 'src/app/services/identity.service';
import { CartridgeService } from './../../services/cartridge.service';
import { DiscoveryService } from './../../services/discovery.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cartridgeName', 'noOfDevice'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  selectedCartridge: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  // dtInstance: DataTables.Api;
  constructor(
    private identityService: IdentityService,
    private cartridgeService: CartridgeService,
    private discoveryService: DiscoveryService
  ) { }
  headerHideShow = false
  ngOnInit() {
    this.getIdentityList();
    this.getCartridgeList();
    this.getDiscoveryList();
    this.getDeviceTypes();
    this.onActivate();
  }
  getDatatableOptions() {
    return {
      pageLength: 10,
      lengthMenu: [5, 10, 25, 50, 100],
      displayLength: 5,
      // buttons: ["print", "excel", "pdf"],
    };
  }
  onActivate() {
    window.scroll(0, 0);
  }
  identityCount: any = 0;
  identityList: any = [];
  DasboardidentityList: any = [];
  getIdentityList() {
    this.identityService.getIdetities().subscribe((resp: any) => {
      console.log(resp);
      this.identityList = resp.identities;
      this.DasboardidentityList = resp.identities.slice(0, 3);
      this.identityCount = resp.noOfIdentities;
    });
  }

  cartridgeList: any = [];
  DashboardcartridgeList: any = [];
  getCartridgeList() {
    this.cartridgeService.getCartridge().subscribe((resp: any) => {
      console.log(resp);
      this.cartridgeList = resp;
      this.DashboardcartridgeList = resp.slice(0, 3);
    });
  }

  discoveryList: any = [];
  getDiscoveryList() {
    this.dtOptions = this.getDatatableOptions()
    this.discoveryService.getDiscovery().subscribe((resp: any) => {
      this.dataSource = new MatTableDataSource(resp);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
      });
      console.log(resp);
      this.discoveryList = resp.slice(0, 6);
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }


  deviceTypes: any = [];
  DasboardDeviceList: any = [];

  getDeviceTypes() {
    this.cartridgeService.getTempDeviceTypes().subscribe((resp: any) => {
      console.log(resp);
      this.deviceTypes = resp;
      this.DasboardDeviceList = resp.slice(0, 3);
    });
  }
}
