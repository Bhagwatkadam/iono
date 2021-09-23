import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-protocol",
  templateUrl: "./protocol.component.html",
  styleUrls: ["./protocol.component.css"],
})
export class ProtocolComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createProtocolForm();
    this.addParameter();
  }

  protocolForm: FormGroup;
  createProtocolForm() {
    this.protocolForm = this.fb.group({
      name: ["", Validators.required],
      parameters: this.fb.array([])
    });
  }

  get f() {
    return this.protocolForm.controls;
  }
  get parameters() {
    return this.protocolForm.get("parameters") as FormArray;
  }

  addParameter() {
    if (this.parameters.value && this.parameters.value.length > 0) {
      if (!this.validateParameters(this.parameters.value)) {
        this.toastr.error("Please fill previous parametrs before adding.");
        return;
      }
    }
    this.parameters.push(this.createParameter());
  }
  validateParameters(params) {
    let isValid = true;
    params.map((param) => {
      if (!param.value || !param.value.trim()) {
        isValid = false;
      }
    });
    return isValid;
  }
  removeParameter(index: number) {
    if (this.parameters.length !== 1) {
      this.parameters.removeAt(index);
    }
  }
  createParameter() {
    return this.fb.group({
      value: ["", Validators.required],
    });
  }

  protocols: any = [];
}
