import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from './../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ConformationComponent } from '../shared/conformation/conformation.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-users-list',
  templateUrl: './all-users-list.component.html',
  styleUrls: ['./all-users-list.component.css']
})
export class AllUsersListComponent implements OnInit {
  displayedColumns: string[] = ['sNo', 'name', 'user_id', 'mobile', 'created_on', 'action'];
  selection = new SelectionModel(true, []);
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  selectedUser : any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private dialog:MatDialog
  ) { }

  ngOnInit() {
    this.getUsersList();
    this.onActivate(event);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  onActivate(event) {
    window.scroll(0, 0);
  }

  usersList: any = [];

  getUsersList() {
    this.userService.getUser().subscribe((resp: any) => {
      this.usersList = resp;
      const orginalData : any = [];
        let i = 0;
        resp.map(data=>{
          const orgData:any = {};
          i = i + 1;
          orgData.sNo = i;
          orgData.address = data.address;
          orgData.created_by = data.created_by;
          orgData.created_on = data.created_on;
          orgData.mobile = data.mobile;
          orgData.name = data.name;
          orgData.role = data.role;
          orgData.updated_on = data.updated_on;
          orgData.user_id = data.user_id;
          orginalData.push(orgData);
        })
      this.dataSource = new MatTableDataSource(orginalData);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
  }
  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }
  onSelectedItem(row){
    console.log(row);
    this.selectedUser = row;
  }

  delete() {
    this.dialog.open(ConformationComponent, {
      data: { dialogMessage: 'Are you sure you want to delete?', hasBackdrop: false }
    })
      .afterClosed()
      .subscribe(confirmation => {
        if (confirmation) {
          this.userService.deleteUser(this.selectedUser.user_id).subscribe((res: any) => {
            this.toastr.success('Deleted successfully');
            this.getUsersList();
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
