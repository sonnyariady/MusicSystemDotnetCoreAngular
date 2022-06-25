import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user.model';
import { GeneralService } from 'src/app/_services/general.service';
import { LoginResultModel } from 'src/app/_models/login-result-model.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  formData = new FormGroup({
    userId : new FormControl('',[Validators.required,Validators.minLength(3)]),
    password : new FormControl('',[Validators.required, Validators.minLength(3)])
  });
  userData : User;
  
  constructor(
    private service : UserService,
    private toast : ToastrService,
    private router : Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('CurrentUser')!=null){
      this.router.navigateByUrl('PinjamList');
    }
  }

  get f(){
    return this.formData.controls;
  }

  login(){
    console.log(this.formData.value);
    this.service.Login(this.formData.value).subscribe(res=>{
 console.log("Hasil login: ", res);
 var loginresult = res as LoginResultModel
 if (loginresult.isSuccess)
 {
  this.userData = loginresult.userDetail;
  console.log("Nilai userdata sebelum set item: ", this.userData);
  localStorage.setItem('CurrentUser',btoa(JSON.stringify(this.userData)));
  this.router.navigateByUrl('PinjamList');
 }
 else
 {
  this.toast.error(loginresult.errorMessage);
 }
  })
}

}
