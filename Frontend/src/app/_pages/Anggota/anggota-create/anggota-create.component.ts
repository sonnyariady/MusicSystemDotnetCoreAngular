import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Anggota } from 'src/app/_models/anggota.model';
import { FormPopulatorService } from 'src/app/_services/form-populator.service';

@Component({
  selector: 'app-anggota-create',
  templateUrl: './anggota-create.component.html',
  styleUrls: ['./anggota-create.component.css']
})
export class AnggotaCreateComponent implements OnInit {
JudulTransaksi: string;
IsCreateMode : boolean;
IsAllReadOnly : boolean;

  constructor(
    private service : FormPopulatorService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private fb : FormBuilder,
    private toast : ToastrService,
  ) { }

  formData = this.fb.group({
    noAnggota : [''],
    namaAnggota : [''],
    jenisKelamin : [''],
    alamat : [''],
    telp : ['']
  });

IsValidate()
{
  if (this.formData.value.namaAnggota == "")
  {
    this.toast.error("Input Nama Anggota!", "Library System");
    return false;
  }

  if (this.formData.value.jenisKelamin == "")
  {
    this.toast.error("Pilih Jenis Kelamin!", "Library System");
    return false;
  }

  if (this.formData.value.alamat == "")
  {
    this.toast.error("Input Alamat!", "Library System");
    return false;
  }

  if (this.formData.value.telp == "")
  {
    this.toast.error("Input Telp!", "Library System");
    return false;
  }

  return true;
}

  Simpan()
  {
    if (!this.IsValidate())
    {
      return;
    }
    var anggotasimpan = new Anggota();
    anggotasimpan.noAnggota = this.IsCreateMode ? "" : this.formData.getRawValue().noAnggota;
    anggotasimpan.namaAnggota = this.formData.getRawValue().namaAnggota;
    anggotasimpan.jenisKelamin = this.formData.getRawValue().jenisKelamin;
    anggotasimpan.alamat = this.formData.getRawValue().alamat;
    anggotasimpan.telp = Number(this.formData.getRawValue().telp);

    console.log("Nilai anggota simpan: ", anggotasimpan);
    console.log("Nilai anggota simpan json: ", JSON.stringify(anggotasimpan));
    if (this.IsCreateMode)
 {
   this.service.AnggotaCreate(anggotasimpan).subscribe( res => {

    this.toast.success('Anggota telah didaftarkan', 'Libary System');
    this.router.navigate(['/AnggotaList']);

   });
 }
 else
 {
  this.service.AnggotaUpdate(anggotasimpan).subscribe( res => {
    this.toast.success('Anggota telah diupdate', 'Libary System');
    this.router.navigate(['/AnggotaList']);

  });
 }
     

  }

  ngOnInit(): void {

    this.service.getCurrentUser();
   
    
    this.IsAllReadOnly = false;
    let requestid = this.currentRoute.snapshot.paramMap.get('id');

    if (requestid == null) 
    {
      this.IsCreateMode = true;
      this.JudulTransaksi = "Daftar Anggota Baru";
    }
    else
    {
      this.IsCreateMode = false;
      this.JudulTransaksi = "Edit Anggota";
      this.loadDataById(requestid);
    }

  }

  loadDataById(id)
{
  this.service.getAnggotaById(id).then(res => {
console.log("Anggota load ", res);

var objAnggota = res as Anggota;

    
this.formData.patchValue({
  noAnggota : objAnggota.noAnggota.replace(/\s/g, ""),
  namaAnggota : objAnggota.namaAnggota,
  alamat : objAnggota.alamat,
  telp : objAnggota.telp,
  jenisKelamin : objAnggota.jenisKelamin
});

this.formData.controls['noAnggota'].disable();


  });
}


  

}
