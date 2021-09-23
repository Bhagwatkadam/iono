import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  forgotpassWord: any = {};

  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get forgot() {
    return this.forgotForm.controls;
  }

  forgotpassword() {
    if (this.forgotForm.invalid) {
      return;
    }
    this.userService.forgotPassword(this.forgotpassWord.email).subscribe((data: any) => {
      this.toastr.success("Password sent successfully");
      this.forgotpassWord.email = "";
    }, (err) => {
      this.toastr.error(err.error.message);
    });
  }
}
