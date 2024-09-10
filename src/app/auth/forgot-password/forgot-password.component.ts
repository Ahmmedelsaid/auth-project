import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule, NgOtpInputModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  passresetForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  returnUrl!: string;
  year: number = new Date().getFullYear();
  // otpDisplay : boolean = false
  // otpConfig = {
  //   length: 4,
  //   allowNumbersOnly: true,
  //   autoFocus: true,
  //   // placeholder: '_'
  // };

  // otp: string = '';

  constructor(private formBuilder: UntypedFormBuilder,
    private httpClient : HttpClient,
    private toaster : ToastrService
  ) { }

  ngOnInit(): void {
     this.passresetForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.passresetForm.controls; }

   onSubmit() {
    this.submitted = true;
    if (this.passresetForm.invalid) {
      return;
    }
    else{
      this.httpClient.post('https://api-takaa.mgicsolutions.com/api/admin/v1/forgot-password', this.passresetForm.value)
      .subscribe({
        next: (response : any) => {
          if(response.status === 401){
            this.toaster.error(response.msg)
          }
          else{
            this.toaster.success(response.data)
            // this.otpDisplay= true
            // this.passresetForm.reset()
            console.log(response)
          }        },
        error: (err) => {
          console.error('Login error', err);
        }
      });
    }
  }

  // onOtpChange(otp: string) {
  //   this.otp = otp;
  //   console.log('Current OTP:', this.otp);
  // }

  // Submit() {
  //   console.log('Submitted OTP:', this.otp);
  // }

}
