import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISoapMethodResponse, NgxSoapService } from 'ngx-soap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Anggota } from '../_models/anggota.model';
 
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class FormPopulatorService extends GeneralService {

  constructor(
    protected http : HttpClient,
    protected datePipe: DatePipe,
  ) { 
    super(http, datePipe);
  }
  loadClient(){
    
  }

  
  getBukuList() {
    const body = {

    };
    return this.http.post(environment.apiURL + 'Bukus/GetBuku', body).toPromise();
  }

  getAnggotaById(id)
  {
    return this.http.get(environment.apiURL + 'Anggotas/GetAnggota/' + id).toPromise();
  }

  getAnggotaList() {
    const body = {

    };
    return this.http.post(environment.apiURL + 'Anggotas/GetAnggota', body).toPromise();
  }

 AnggotaCreate(data : Anggota)
  {
    
    const body = {
      
      namaAnggota : data.namaAnggota,
      alamat : data.alamat,
      jenisKelamin : data.jenisKelamin,
      telp : data.telp

    };



    return this.http.post(environment.apiURL + 'Anggotas/Insert',body);
  }

  AnggotaUpdate(data : Anggota)
  {
     

    const body = {
      namaAnggota : data.namaAnggota,
      alamat : data.alamat,
      jenisKelamin : data.jenisKelamin,
      telp : data.telp,
      noAnggota : data.noAnggota

    };
    return this.http.post(environment.apiURL + 'Anggotas/Update',body);
  }
 
 
  
}
