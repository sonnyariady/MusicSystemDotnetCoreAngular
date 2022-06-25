import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ISoapMethodResponse, NgxSoapService } from 'ngx-soap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
import { EmployeePreviewModel } from '../_models/employee-preview-model.model';
 
import { PagingParameterModel } from '../_models/paging-parameter-model.model';
 
 
 
 
 
import { GeneralService } from './general.service';
 
import { HttpClient } from '@angular/common/http';
import { PinjamHeaderModel } from '../_models/pinjam-header-model.model';

@Injectable({
  providedIn: 'root'
})
export class TaskToDoService extends GeneralService {

  constructor(
    protected http : HttpClient,
    protected datePipe: DatePipe,
  ) {
    super(http, datePipe);
  }

  loadClient(){
     
  }

  getPinjamList() {
    const body = {

    };
    return this.http.post(environment.apiURL + 'Pinjams/GetPinjamList', body).toPromise();
  }

  getPinjamById(id : string) {
    const body = {
       
    };
    return this.http.post(environment.apiURL + 'Pinjams/GetPinjamById?id=' + id, body).toPromise();
  }

  pinjamCreate(data : PinjamHeaderModel)
  {
    var jsondata = JSON.stringify(data);
    const body = {
      idPetugas :  data.idPetugas,
      noAnggota : data.noAnggota,
      tglPinjam : data.tglPinjam,
      tglKembali : data.tglKembali,
      detailPinjam : data.detailPinjam

    };



    return this.http.post(environment.apiURL + 'Pinjams/Insert',body);
  }

  pinjamUpdate(data : PinjamHeaderModel)
  {
    var jsondata = JSON.stringify(data);

    const body = {
      noPinjam : data.noPinjam,
      idPetugas :  data.idPetugas,
      noAnggota : data.noAnggota,
      tglPinjam : data.tglPinjam,
      tglKembali : data.tglKembali,
      detailPinjam : data.detailPinjam

    };
    return this.http.post(environment.apiURL + 'Pinjams/Update',body);
  }

  GetUserAction() : EmployeePreviewModel
  {
    this.getCurrentUser();
    let userAct = new EmployeePreviewModel();
    
    userAct.IdPetugas = this.currentUser.idPetugas;
    userAct.JenisKelamin = this.currentUser.jenisKelamin;
    userAct.NamaPetugas = this.currentUser.namaPetugas;
    
    return userAct;
  }

  
 


}
