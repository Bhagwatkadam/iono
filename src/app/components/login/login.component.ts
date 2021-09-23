import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm } from "@angular/forms";
import { LoginService } from './../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  registerForm: FormGroup;
  forgotForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      // Validators.email
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }
  loginResponse: any;

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const dataToSend = { user_id: this.registerForm.value.email, password: this.registerForm.value.password }
    this.loginService.login(dataToSend).subscribe((resp: any) => {
      this.loggedIn.next(true);
      this.toastr.success("User login success");
      // this.loginResponse = resp.userId;
      // sessionStorage.setItem('user_Id', this.loginResponse);
      this.router.navigate(["/dashboard"]);
      this.getUser();
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.submitted = false;
    })
  }

  @ViewChild("cpfClsBtn", { static: false }) cpfClsBtn: ElementRef;
  @ViewChild("upf", { static: false }) updatePasswordForm: NgForm;
  forgotpassWord: any = {};
  submited = false;
  forgotpassword() {
    this.spinner.show();
    this.submited = true;
    if (this.forgotForm.invalid) {
      return;
    }
    this.userService.forgotPassword(this.forgotpassWord.email).subscribe((data: any) => {
      this.toastr.success("Password sent successfully");
      this.forgotpassWord.email = "";
      this.cpfClsBtn.nativeElement.click();
      this.spinner.hide();
      this.submited = false;
    }, (err) => {
      this.spinner.hide();
      this.submited = false;
      this.toastr.error(err.error.message);
    });
  }

  clearforgotpassword() {
    this.forgotpassWord.email = "";
    this.updatePasswordForm.resetForm();
  }

  getUser() {
    this.loginService.getUser().subscribe((res: any) => {
      sessionStorage.setItem('name', res.name || res.login);
      sessionStorage.setItem('user_Id', res.id);
      sessionStorage.setItem('orgId', res.orgId);
      this.getAuthKey(res);
    })
  }

  getAuthKey(resData: any) {
    this.loginService.getAuthKey(resData).subscribe((res: any) => {
      sessionStorage.setItem('token', res);
    })

  }
}
