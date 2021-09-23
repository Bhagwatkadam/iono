import { Component, OnInit, ViewChild } from '@angular/core';
import { IdentityService } from 'src/app/services/identity.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import { CartridgeService } from 'src/app/services/cartridge.service';
import { AllDevicesViewDialogComponent } from '../all-devices-view-dialog/all-devices-view-dialog.component';
import { ConformationComponent } from '../../shared/conformation/conformation.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-devices',
  templateUrl: './all-devices.component.html',
  styleUrls: ['./all-devices.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AllDevicesComponent implements OnInit {
  // displayedColumns: string[] = [ 'S.No','deviceId', 'scanId', 'vendorName' ,'version', 'createdOn', 'action'];
  displayedColumns: string[] = ['deviceId', 'name', 'type', 'timestamp', 'action'];
  selection = new SelectionModel(true, []);
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  selectedDevice: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isTableExpanded = false;

  constructor(
    private cartridgeService: CartridgeService,
    private identityService: IdentityService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router,
    private deviceService: DeviceService
  ) { }

  ngOnInit() {
    //this.getCartridgeList();
    //this.getIdentityList();
    this.getDeviceList();
    window.scroll(0, 0);
  }
  getDeviceList() {
    this.deviceService.getAllDevice().subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        res[i]['resources'] = [{ mqttCommandEndpoint: res[i].mqttCommandEndpoint, mqttDataEndpoint: res[i].mqttCommandEndpoint, createdOn: '' }]
      }
      this.dataSource = new MatTableDataSource(res);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    })
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
    this.toggleTableRows();
  }

  onSelectedItem(row) {
    this.selectedDevice = row;
  }

  getRowValue(row) {
    this.selection.toggle(row);
    row.isExpanded = !row.isExpanded
  }

  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;
    this.dataSource.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    })
  }

  cartridgeList: any = [];
  getCartridgeList() {
    this.cartridgeService.getCartridge().subscribe((resp: any) => {
      this.cartridgeList = resp;
    });
  }

  identityList: any = [];
  getIdentityList() {
    this.identityService.getIdetities()
      .subscribe((resp: any) => {
        this.identityList = resp.identities;
        const orginalData: any = [];
        let i = 0;
        resp.identities.map(data => {
          const orgData: any = {};
          i = i + 1;
          orgData.sNo = i;
          orgData.config = data.config;
          orgData.createdOn = data.createdOn;
          orgData.deviceId = data.deviceId;
          orgData.deviceType = data.deviceTypeon;
          orgData.message = data.message;
          orgData.noOfNodes = data.noOfNodes;
          orgData.scanId = data.scanId;
          orgData.updatedOn = data.updatedOn;
          orgData.vendorName = data.vendorName;
          orgData.version = data.version;
          orgData.resources = data.resources;
          orginalData.push(orgData);
        })
        this.dataSource = new MatTableDataSource(orginalData);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      }, (error: any) => {
        this.toastr.error(error.error.message);
      });
  }

  deleteId: string = '';
  deleteDevice() {
    this.dialog.open(ConformationComponent, {
      data: { dialogMessage: 'Are you sure you want to delete?', hasBackdrop: false }
    })
      .afterClosed()
      .subscribe(confirmation => {
        if (confirmation) {
          let data: any = this.selectedDevice;
          this.deviceService.deleteDevice(data.id).subscribe((res: any) => {
            this.toastr.success('Deleted successfully');
            this.getDeviceList();
          }, (err: HttpErrorResponse) => {
            this.toastr.error(err.error.message);
          })
        }
      })
  }

  viewDevice() {
    const dialogRef = this.dialog.open(AllDevicesViewDialogComponent, {
      width: "auto",
      height: "auto",
      data: this.selectedDevice,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getIdentityList();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editDevice() {
    let data: any = this.selectedDevice;
    this.router.navigate(['edit-device'], { queryParams: this.selectedDevice })
  }
}