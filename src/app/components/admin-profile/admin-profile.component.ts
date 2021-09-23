import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { MustMatch } from "../../_helpers/must-match.validator"
import { UserService } from './../../services/user.service';
// import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AdminChangePasswordDialogComponent } from '../admin-change-password-dialog/admin-change-password-dialog.component';


@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
changepassword: FormGroup;
isEdit = false;

editProfile() {
  this.isEdit = true;
}
cancelEdit() {
  this.userDetailsById();
  this.isEdit = false;

}
  constructor(
    private fb: FormBuilder,
    private userService: UserService,  
    // private cookieService : CookieService,
    private toastr: ToastrService,
    private dialog:MatDialog

  ) { }

  ngOnInit() {
    this.changePasswordForm();
    this.userDetailsById();
    this.onActivate(event);
  }

  onActivate(event) {
    window.scroll(0, 0);
  }
  
  changePasswordForm() {
    this.changepassword = this.fb.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    },
    {
      validator: MustMatch('newPassword', 'confirmPassword')
  });
  }
  get f() {
    return this.changepassword.controls;
  }
  userDetails: any = {};
  userdetailsById : any = [];
  userDetailsById(){
    // this.userDetails = this.cookieService.getObject('loginResponce');
    this.userDetails.userId = sessionStorage.getItem('user_Id');
    this.userService.getUserById(this.userDetails.userId).subscribe((resp: any) => {
      this.userdetailsById = resp;
     // sessionStorage.setItem('name',this.userdetailsById.name);
    }
    )};

    disableSubmit: boolean = false;
    updateData() {
      this.disableSubmit = true;
          const EditDetails = {name:this.userdetailsById.name,mobile:this.userdetailsById.mobile,address:this.userdetailsById.address}
          this.userService.updateUserById(EditDetails,this.userDetails.userId).subscribe((data: any) => {
            this.toastr.success('Profile updated successfully.');
            this.userDetailsById();
            this.disableSubmit = false;
            this.isEdit = false;
          }, error => {
            this.toastr.error(error.error.error.message);
            this.disableSubmit = false;
          });
    }

    @ViewChild("cpfClsBtn", { static: false })
  cpfClsBtn: ElementRef;
    changePassword(){
      const data = {
        user_id: this.userDetails.userId,
        old_password: this.changepassword.value.oldPassword,
        confirm_password: this.changepassword.value.confirmPassword,
        password: this.changepassword.value.newPassword
      }
      
      this.userService.changePassword(data).subscribe((data: any) => {
        this.toastr.success('Password changed successfully.');
        this.changePasswordForm();
        this.cpfClsBtn.nativeElement.click();
        this.disableSubmit = false;
      }, error => {
        this.toastr.error(error.error.message);
        this.disableSubmit = false;
      });
    }


    alphabets_dot_space_only(e){
      var keyCode = (e.keyCode ? e.keyCode : e.which);
      if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || keyCode === 46 || keyCode === 32 ){
          return true
      }
      return false;
    }

    openDialog(){
      const dialogRef = this.dialog.open(AdminChangePasswordDialogComponent, {
        width: "500px",
        height: "360px",
        data : 'any'
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        // this.getIdentityList();
      });
    }

}

