import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-admin-change-password-dialog',
  templateUrl: './admin-change-password-dialog.component.html',
  styleUrls: ['./admin-change-password-dialog.component.css']
})
export class AdminChangePasswordDialogComponent implements OnInit {

  constructor(private userService: UserService,private fb:FormBuilder,private toastr: ToastrService,public dialogRef: MatDialogRef<AdminChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  changepassword: FormGroup;

  ngOnInit(): void {
    this.changePasswordForm();
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

  changePassword(){
    const data = {
      user_id: sessionStorage.getItem('user_Id'),
      old_password: this.changepassword.value.oldPassword,
      confirm_password: this.changepassword.value.confirmPassword,
      password: this.changepassword.value.newPassword
    }
    
    this.userService.changePassword(data).subscribe((data: any) => {
      this.toastr.success('Password changed successfully.');
      this.close();
      this.changePasswordForm();
    }, error => {
      this.toastr.error(error.error.message);
    });
  }

  close(){
    this.dialogRef.close();
  }

}
