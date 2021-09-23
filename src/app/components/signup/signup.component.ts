import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm } from "@angular/forms";
import { LoginService } from './../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  registerForm: FormGroup;
  forgotForm: FormGroup;
  submitted = false;
  orgId: number = 0;
  userId: number = 0
  userAdminId: number = 0

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router,
    private signupService: SignupService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      organization: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.loginAdminSign('onInit');
  }

  get f() {
    return this.registerForm.controls;
  }

  loginResponse: any;

  loginAdminSign(by: string) {
    const loginData = { "user": 'admin', "password": 'admin' }
    this.loginService.loginSignup(loginData).subscribe((res: any) => {
      if (by == 'user') {
        this.createOrg();
      }
    }, (err: any) => {
      this.toastr.error(err.error.message);
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loginAdminSign("user");
  }
  createOrg() {
    this.signupService.createOrg(this.registerForm.value).subscribe((res: any) => {
      this.orgId = res.orgId;
      this.signupUser();
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.submitted = false;
    })
  }

  signupUser() {
    this.signupService.signupUser(this.registerForm.value).subscribe((res: any) => {
      this.userId = res.id;
      this.asignOrgToUser();
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.submitted = false;
    })
  }
  asignOrgToUser() {
    this.signupService.asignOrgToUser(this.orgId, this.registerForm.value).subscribe((res: any) => {
      this.removeOrg();
    })
  }
  removeOrg() {
    this.signupService.removeOrg(this.userId).subscribe((res: any) => {
      this.signupAdminUser();
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.submitted = false;
    })
  }
  //For user admin
  signupAdminUser() {
    this.signupService.signupAdminUser(this.orgId, this.registerForm.value).subscribe((res: any) => {
      this.userAdminId = res.id;
      this.asignOrgToAdminUser();
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.submitted = false;
    })
  }
  asignOrgToAdminUser() {
    this.signupService.asignOrgToAdminUser(this.orgId, this.registerForm.value).subscribe((res: any) => {
      this.removeMainAdminOrg();
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.submitted = false;
    })
  }
  removeMainAdminOrg() {
    this.signupService.removeOrg(this.userAdminId).subscribe((res: any) => {
      this.changeUserAdminRole();
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.submitted = false;
    })
  }
  changeUserAdminRole() {
    this.signupService.changeUserAdminRole(this.userAdminId, this.orgId).subscribe((res: any) => {
      this.loginAfterSignup();
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.submitted = false;
    })
  }
  /// user admin end
  loginAfterSignup() {
    const login = this.registerForm.value.organization.split(' ')[0] + "_" + this.orgId;
    const loginData = { "user": login, "password": "Welcome2021" } 
    this.loginService.loginSignup(loginData).subscribe((res: any) => {
      this.creteDatabase();
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.submitted = false;
    })
  }

  creteDatabase() {
    this.signupService.createDatabase(this.registerForm.value, this.orgId).subscribe((res: any) => {
      console.log(res);
      this.createPostgresDatasources();
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.createPostgresDatasources();
      this.submitted = false;
    })
  }

  createPostgresDatasources() {
    this.signupService.createPostgresDatasources(this.registerForm.value, this.orgId).subscribe((res: any) => {
      this.createInfluxDatasources();
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.submitted = false;
    })
  }

  createInfluxDatasources() {
    this.signupService.createInfluxDatasources(this.registerForm.value, this.orgId).subscribe((res: any) => {
      this.assignTemplate();
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.submitted = false;
    })
  }
  assignTemplate() {
    this.signupService.assignTemplate(this.registerForm.value.name, this.orgId).subscribe((res: any) => {
      this.router.navigate(["/client-login"]);
      this.toastr.success("User created successfully.");
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.submitted = false;
    })
  }
  submited = false;
}
