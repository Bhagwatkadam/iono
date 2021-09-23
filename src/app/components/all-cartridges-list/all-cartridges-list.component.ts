import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CartridgeService } from 'src/app/services/cartridge.service';
import { CartridgeConfigViewDialogComponent } from '../cartridge-config-view-dialog/cartridge-config-view-dialog.component';
import { ConformationComponent } from '../shared/conformation/conformation.component';

@Component({
  selector: 'app-all-cartridges-list',
  templateUrl: './all-cartridges-list.component.html',
  styleUrls: ['./all-cartridges-list.component.css']
})
export class AllCartridgesListComponent implements OnInit {
  displayedColumns: string[] = ['sNo', 'name', 'created_on', 'action'];
  selection = new SelectionModel(true, []);
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  selectedCartridge : any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cartridgeService: CartridgeService,private dialog:MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCartridgeList();
  }

  getCartridgeList(){
    this.cartridgeService.getCartridge().subscribe(
      (data : any)=>{
        console.log(data);
        const orginalData : any = [];
        let i = 0;
        data.map(data=>{
          const orgData:any = {};
          i = i + 1;
          orgData.sNo = i;
          orgData.id = data.id;
          orgData.name = data.name;
          orgData.timestamp = data.timestamp;
          orgData.updated_on = data.updated_on;
          orgData.created_by = data.created_by;
          orgData.created_on = data.created_on;
          orgData.config = data.config;
          orginalData.push(orgData);
        })
        console.log(orginalData);
        this.dataSource = new MatTableDataSource(orginalData);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  onSelectedItem(row){
    this.selectedCartridge = row;
  }

  viewConfig(row:any){
    const dialogRef = this.dialog.open(CartridgeConfigViewDialogComponent, {
      panelClass: 'dialog-container-custom',
      width: "500px",
      height: "550px",
      data: row
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCartridgeList();
    });
  }

  delete() {
    this.dialog.open(ConformationComponent, {
      data: { dialogMessage: 'Are you sure you want to delete?', hasBackdrop: false }
    })
      .afterClosed()
      .subscribe(confirmation => {
        if (confirmation) {
          this.cartridgeService.deleteCatridge(this.selectedCartridge.id).subscribe((res: any) => {
            this.toastr.success('Deleted successfully');
            this.getCartridgeList();
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
