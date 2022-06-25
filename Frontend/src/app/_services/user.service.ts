import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISoapMethodResponse, NgxSoapService } from 'ngx-soap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GeneralService {

  constructor(
    protected http : HttpClient,
    protected datePipe: DatePipe,
  ) {
    super(http, datePipe);
   }

   loadClient(){
     
  }

  Login(formData : User)  
  {
    const body = {
      userId : formData.userId,
      password: formData.password
    };    
    


    return this.http.post(environment.apiURL + environment.modulUser + 'LoLogin',body);
  }

  SearchEmployee_ngx(payroll: string, name: string) : Observable<ISoapMethodResponse>
{
  const body = {
    payroll : payroll,
    name : name
  };    
  return this.userClient.call('SearchEmployee',body)
}
 
GetEmployeeDetail_ngx(payroll: string) : Observable<ISoapMethodResponse>
{
  const body = {
    payroll : payroll,
    name : ''
  };    
  return this.userClient.call('GetEmployeeDetail',body)
}

  searchMember(payroll: string, name: string) : Observable<ISoapMethodResponse>
  {
    const body = {
      payroll : payroll,
      name : name
    };    
    return this.userClient.call('searchMember',body)
  }
   

}
