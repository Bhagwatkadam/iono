import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CartridgeService } from 'src/app/services/cartridge.service';
import { DiscoveryService } from 'src/app/services/discovery.service';

@Component({
  selector: 'app-discovery-scan-devices',
  templateUrl: './discovery-scan-devices.component.html',
  styleUrls: ['./discovery-scan-devices.component.css']
})
export class DiscoveryScanDevicesComponent implements OnInit {

  displayedColumns: string[] = ['sNo','id', 'type', 'version'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cartridgeService: CartridgeService,private toastr:ToastrService,public dialogRef: MatDialogRef<DiscoveryScanDevicesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    const orginalData : any = [];
        let i = 0;
        this.data.devices.map(data=>{
          const orgData:any = {};
          i = i + 1;
          orgData.sNo = i;
          orgData.id = data.id;
          orgData.resources = data.resources;
          orgData.timestamp = data.timestamp;
          orgData.type = data.type;
          orgData.version = data.version;
          orginalData.push(orgData);
        })
    this.dataSource =new MatTableDataSource(orginalData);
  }

  close(){
    this.dialogRef.close();
  }

}
