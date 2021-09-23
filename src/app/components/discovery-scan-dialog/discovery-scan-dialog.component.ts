import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DiscoveryService } from 'src/app/services/discovery.service';

@Component({
  selector: 'app-discovery-scan-dialog',
  templateUrl: './discovery-scan-dialog.component.html',
  styleUrls: ['./discovery-scan-dialog.component.css']
})
export class DiscoveryScanDialogComponent implements OnInit {
  displayedColumns: string[] = ['sNo','id', 'status', 'startedOn', 'endeddOn'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http:HttpClient,private discoveryService: DiscoveryService,private toastr:ToastrService,public dialogRef: MatDialogRef<DiscoveryScanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.discoveryService.getRunList(this.data.id).subscribe((resp: any) => {
      console.log(resp);
      const orginalData : any = [];
        let i = 0;
        resp.map(data=>{
          const orgData:any = {};
          i = i + 1;
          orgData.sNo = i;
          orgData.id = data.id;
          orgData.scanId = data.scanId;
          orgData.status = data.status;
          orgData.startedOn = data.startedOn;
          orgData.endeddOn = data.endeddOn;
          orginalData.push(orgData);
        })
      this.dataSource = new MatTableDataSource(orginalData); 
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
