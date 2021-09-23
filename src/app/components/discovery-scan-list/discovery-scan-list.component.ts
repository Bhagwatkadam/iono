import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DiscoveryService } from 'src/app/services/discovery.service';
import { DiscoveryScanDevicesComponent } from '../discovery-scan-devices/discovery-scan-devices.component';
import { DiscoveryScanDialogComponent } from '../discovery-scan-dialog/discovery-scan-dialog.component';
import { ConformationComponent } from '../shared/conformation/conformation.component';

@Component({
  selector: 'app-discovery-scan-list',
  templateUrl: './discovery-scan-list.component.html',
  styleUrls: ['./discovery-scan-list.component.css']
})
export class DiscoveryScanListComponent implements OnInit {
  displayedColumns: string[] = ['sNo', 'id', 'cartridgeName', 'noOfDevice', 'run', 'schedule', 'action'];
  selection = new SelectionModel(true, []);
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  selectedCartridge: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private discoveryService: DiscoveryService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDiscoveryList();
  }

  getDiscoveryList() {
    this.discoveryService.getDiscovery().subscribe((resp: any) => {
      console.log(resp);
      const orginalData: any = [];
      let i = 0;
      resp.map(data => {
        const orgData: any = {};
        i = i + 1;
        orgData.sNo = i;
        orgData.cartridgeId = data.cartridgeId;
        orgData.cartridgeName = data.cartridgeName;
        orgData.config = data.config;
        orgData.devices = data.devices;
        orgData.entityId = data.entityId;
        orgData.filter = data.filter;
        orgData.id = data.id;
        orgData.noOfDevice = data.noOfDevice;
        orginalData.push(orgData);
      })
      this.dataSource = new MatTableDataSource(orginalData);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  runScan(id) {
    this.discoveryService.runScan(id).subscribe((resp: any) => {
      this.toastr.success("Scan completed successfully");
      this.getDiscoveryList();
    });
  }

  viewDetails(row) {
    const dialogRef = this.dialog.open(DiscoveryScanDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getDiscoveryList();
    });
  }

  viewDevices(row) {
    const dialogRef = this.dialog.open(DiscoveryScanDevicesComponent, {
      width: 'auto',
      height: 'auto',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getDiscoveryList();
    });
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onSelectedItem(row) {
    this.selectedCartridge = row;
  }

  delete() {
    this.dialog.open(ConformationComponent, {
      data: { dialogMessage: 'Are you sure you want to delete?', hasBackdrop: false }
    })
      .afterClosed()
      .subscribe(confirmation => {
        if (confirmation) {
          this.discoveryService.deleteDiscovery(this.selectedCartridge.id).subscribe((res: any) => {
            this.toastr.success('Deleted successfully');
            this.getDiscoveryList();
          }, (err: HttpErrorResponse) => {
            this.toastr.error(err.error.message);
          })
        }
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
