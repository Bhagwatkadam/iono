import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm } from "@angular/forms";
import { MustMatch } from "../../_helpers/must-match.validator"
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {
  UsercreateForm: FormGroup;
  personalDetailsFormGroup: FormGroup;
  addressDetailsFormGroup: FormGroup;
  isOptional = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private Userservice: UserService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.personalDetailsFormGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required],
    },
      {
        validator: MustMatch('password', 'confirm_password')
      });
    this.addressDetailsFormGroup = this._formBuilder.group({
      address: ['', Validators.required]
    });
    console.log(this.personalDetailsFormGroup);
    this.UserCreationForm();
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

  UserCreationForm() {
    this.UsercreateForm = this.fb.group({
      name: ["", Validators.required],
      user_id: ['', [Validators.required, Validators.email]],
      mobile: ["", [Validators.required, Validators.minLength(10)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirm_password: ["", Validators.required],
      address: ["", Validators.required],
    },
      {
        validator: MustMatch('password', 'confirm_password')
      });
  }
  get f() {
    return this.UsercreateForm.controls;
  }

  get p() {
    return this.personalDetailsFormGroup.controls;
  }

  get a() {
    return this.addressDetailsFormGroup.controls;
  }

  onUserSubmit() {
    this.submitted = true;
    if (this.personalDetailsFormGroup.invalid || this.addressDetailsFormGroup.invalid) {
      return;
    }
    const dataToSend = {
      name: this.personalDetailsFormGroup.value.name,
      user_id: this.personalDetailsFormGroup.value.email,
      mobile: this.personalDetailsFormGroup.value.mobile,
      password: this.personalDetailsFormGroup.value.password,
      confirm_password: this.personalDetailsFormGroup.value.confirm_password,
      address: this.addressDetailsFormGroup.value.address
    }
    this.Userservice.createUser(dataToSend).subscribe((resp: any) => {
      this.UserCreationForm();
      this.toastr.success("User created successfully");
      this.router.navigate(['/all-users-list'])
      this.submitted = false;
    }, (err: any) => {
      this.toastr.error(err.error.message);
      this.submitted = false;
    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  alphabets_dot_space_only(e) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || keyCode === 46 || keyCode === 32) {
      return true
    }
    return false;
  }

}
