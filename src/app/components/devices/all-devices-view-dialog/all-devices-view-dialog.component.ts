import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-all-devices-view-dialog',
  templateUrl: './all-devices-view-dialog.component.html',
  styleUrls: ['./all-devices-view-dialog.component.css']
})
export class AllDevicesViewDialogComponent implements OnInit {

  displayedColumns: string[] = ['uiLabel', 'value', 'createdOn'];
  resources : any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  selectedDevice : any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private identityService: IdentityService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AllDevicesViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

  }

  ngOnInit(): void {
    console.log(this.data);
    this.resources = this.data.resources;
    this.dataSource = new MatTableDataSource(this.data.resources);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  close(){
    this.dialogRef.close();
  }

}
