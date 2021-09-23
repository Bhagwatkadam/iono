import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CartridgeService } from 'src/app/services/cartridge.service';
import { DeviceTypeListViewDialogComponent } from '../device-type-list-view-dialog/device-type-list-view-dialog.component';
import { ConformationComponent } from '../shared/conformation/conformation.component';

@Component({
  selector: 'app-device-type-list',
  templateUrl: './device-type-list.component.html',
  styleUrls: ['./device-type-list.component.css']
})
export class DeviceTypeListComponent implements OnInit {

  displayedColumns: string[] = ['sNo', 'name', 'numberOfParams', 'action'];
  selection = new SelectionModel(true, []);
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  selectedCartridge: any = {};
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cartridgeService: CartridgeService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDeviceTypes();
  }

  getDeviceTypes() {
    this.cartridgeService.getTempDeviceTypes().subscribe((resp: any) => {
      this.dataSource = new MatTableDataSource(resp);
      console.log(this.dataSource)
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
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

  viewDeviceType() {
    const dialogRef = this.dialog.open(DeviceTypeListViewDialogComponent, {
      width: 'auto',
      height: '500',
      data: this.selectedCartridge,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getDeviceTypes();
    });
  }

  delete() {
    this.dialog.open(ConformationComponent, {
      data: { dialogMessage: 'Are you sure you want to delete?', hasBackdrop: false }
    })
      .afterClosed()
      .subscribe(confirmation => {
        if (confirmation) {
          this.cartridgeService.deleteTempDeviceTypes(this.selectedCartridge.name).subscribe((res: any) => {
            this.toastr.success('Deleted successfully');
            this.getDeviceTypes();
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
