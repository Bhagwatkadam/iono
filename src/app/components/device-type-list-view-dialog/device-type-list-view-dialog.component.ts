import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CartridgeService } from 'src/app/services/cartridge.service';

@Component({
  selector: 'app-device-type-list-view-dialog',
  templateUrl: './device-type-list-view-dialog.component.html',
  styleUrls: ['./device-type-list-view-dialog.component.css']
})
export class DeviceTypeListViewDialogComponent implements OnInit {

  displayedColumns: string[] = ['ui_label', 'device_label', 'value_type_name', 'is_static_or_dynamic', 'is_filter'];
  selection = new SelectionModel(true, []);
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  selectedUser : any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  Labels : any;

  constructor(private cartridgeService: CartridgeService,private router:Router,public dialogRef: MatDialogRef<DeviceTypeListViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
     this.cartridgeService
      .getTempDeviceTypeParameters(this.data.name)
      .subscribe((resp: any) => {
        console.log(resp);
        this.Labels = resp;
        this.dataSource = new MatTableDataSource(resp);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      });
  }

  close(){
    this.dialogRef.close();
  }

}
