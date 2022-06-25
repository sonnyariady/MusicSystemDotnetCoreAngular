import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PinjamHeaderModel } from 'src/app/_models/pinjam-header-model.model';
import { FormPopulatorService } from 'src/app/_services/form-populator.service';
import { TaskToDoService } from 'src/app/_services/task-to-do.service';
import { BukuLookupComponent } from '../../Popups/buku-lookup/buku-lookup.component';

@Component({
  selector: 'app-pinjam-create',
  templateUrl: './pinjam-create.component.html',
  styleUrls: ['./pinjam-create.component.css']
})
export class PinjamCreateComponent implements OnInit {
ListDetail = [];
ListAnggota;
ListBuku;
IsCreateMode : boolean;
JudulTransaksi : string;
IsAllReadOnly : boolean;
formData = this.fb.group({
  noAnggota : [''],
  noPinjam : [''],
  TglPinjam : [''],
  TglKembali : [''],
  kdBuku : [''],
  idPetugas : ['']
});

  constructor(
    private service : TaskToDoService,
    private formpopservice : FormPopulatorService,
    private fb : FormBuilder,
    private toast : ToastrService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.service.getCurrentUser();
   
    this.loadAnggota();
    this.loadBuku();
    this.IsAllReadOnly = false;
    let requestid = this.currentRoute.snapshot.paramMap.get('id');

    if (requestid == null) 
    {
      this.IsCreateMode = true;
      this.JudulTransaksi = "Buat Transaksi Pinjam";
    }
    else
    {
      this.IsCreateMode = false;
      this.JudulTransaksi = "Edit Transaksi Pinjam";
      this.loadDataById(requestid);
    }

  }

loadBuku()
{
  this.formpopservice.getBukuList().then(res => {
    console.log("Lihat res: ", res);
    this.ListBuku = res;
    
  });
}

loadDataById(id : string)
{
  this.service.getPinjamById(id).then(res => {
    console.log("Lihat res: ", res);
   var hasil = res as PinjamHeaderModel;

   var yyyy_mulai = Number(hasil.tglPinjam.substring(0,4));
   var mm_mulai = Number(hasil.tglPinjam.substring(4,6));
   var dd_mulai = Number(hasil.tglPinjam.substring(6));

   console.log("Pantau thn_mulai: ", yyyy_mulai);
   console.log("Pantau bln_mulai: ", mm_mulai);
   console.log("Pantau tgl_mulai: ", dd_mulai);

   var TanggalKembali = null;

   if (hasil.tglKembali != "")
   {
    var yyyy_akhir = Number(hasil.tglKembali.substring(0,4));
    var mm_akhir = Number(hasil.tglKembali.substring(4,6));
    var dd_akhir = Number(hasil.tglKembali.substring(6));
    TanggalKembali = new Date(yyyy_akhir, mm_akhir - 1, dd_akhir);
    this.IsAllReadOnly = true;
   }

    this.formData.patchValue(
      {
        noPinjam : hasil.noPinjam,
        noAnggota : hasil.noAnggota,
        TglPinjam : new Date(yyyy_mulai, mm_mulai-1, dd_mulai),
        TglKembali : TanggalKembali,
        idPetugas : hasil.idPetugas

      }
    );

    this.formData.controls['noPinjam'].disable();
    this.formData.controls['noAnggota'].disable();
    this.formData.controls['TglPinjam'].disable();

    if (this.IsAllReadOnly)
    {
      this.formData.controls['TglKembali'].disable();
      this.JudulTransaksi = "Lihat Transaksi Pinjam";
    }
    
this.ListDetail = hasil.detailPinjam;

  });
}

DeleteDetail(idx:number)
{
  this.ListDetail.splice(idx, 1);
}

IsValidate()
{
  if (this.formData.value.noAnggota == "")
  {
    this.toast.error("Pilih Anggota!", "Library System");
    return false;
  }
  if (this.formData.value.TglPinjam == "")
  {
    this.toast.error("Input tanggal pinjam!", "Library System");
    return false;
  }
  if (this.ListDetail.length == 0)
  {
    this.toast.error("Input detail pinjam!", "Library System");
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
 var pinjamsave = new PinjamHeaderModel();
 pinjamsave.tglPinjam = this.service.FormatDateSave(this.formData.getRawValue().TglPinjam);
 pinjamsave.tglKembali = this.service.FormatDateSave(this.formData.getRawValue().TglKembali);
 pinjamsave.noAnggota = this.formData.getRawValue().noAnggota;
 pinjamsave.detailPinjam = this.ListDetail;
 pinjamsave.idPetugas = this.IsCreateMode ? this.service.currentUser.idPetugas : this.formData.getRawValue().idPetugas;
 pinjamsave.noPinjam = this.IsCreateMode ? "" : this.formData.getRawValue().noPinjam;
 if (this.IsCreateMode)
 {
   this.service.pinjamCreate(pinjamsave).subscribe( res => {

    this.toast.success('Data telah disubmit', 'Libary System');
    this.router.navigate(['/PinjamList']);

   });
 }
 else
 {
  this.service.pinjamUpdate(pinjamsave).subscribe( res => {
    this.toast.success('Data telah diupdate', 'Libary System');
    this.router.navigate(['/PinjamList']);

  });
 }
  
}

AddDetail()
{

  const dialogConfig = new MatDialogConfig();

  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width = "80%";
  dialogConfig.height = "90%";
   

  this.dialog.open(BukuLookupComponent, dialogConfig).afterClosed().subscribe(res => {
    if (res.IsDataChange == 1)
    {
        var ObjBuku = res.ObjBuku;
        var checkbukulist = this.ListDetail.filter(a=> a.kdBuku == ObjBuku.kdBuku);
        if (checkbukulist.length == 0)
        {
         this.ListDetail.push(ObjBuku);
        }
       
    }

  });

  


}

  loadAnggota()
  {
    this.formpopservice.getAnggotaList().then(res => {
      console.log("Lihat res: ", res);
      this.ListAnggota = res;

      this.ListAnggota.forEach(element => {
        element.noAnggota = element.noAnggota.replace(/\s/g, "");
      });
      
    });
  }

}
