import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Artist } from 'src/app/_models/artist.model';
import { MusicService } from 'src/app/_services/music.service';

@Component({
  selector: 'app-music-create',
  templateUrl: './music-create.component.html',
  styleUrls: ['./music-create.component.css']
})
export class MusicCreateComponent implements OnInit {
  IsCreateMode : boolean;
  JudulTransaksi : string;

  formData = this.fb.group({
    artistId : [''],
    albumName : [''],
    artistName : [''],
    releaseDate : [''],
    imageUrl : [''],
    sampleUrl : [''],
    price : ['']
  });

  constructor(
    private service : MusicService,
    private fb : FormBuilder,
    private toast : ToastrService,
    private currentRoute: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {

    let requestid = this.currentRoute.snapshot.paramMap.get('id');

    if (requestid == null) 
    {
      this.IsCreateMode = true;
      this.JudulTransaksi = "Add New Data";
    }
    else
    {
      this.IsCreateMode = false;
      this.JudulTransaksi = "Edit Data";
      this.loadDataById(requestid);
    }
  }

  loadDataById(id)
  {
    this.service.getArtistById(id).then(res => {
  console.log("Artist load ", res);
  
  var objArtist = res as Artist;
  
  var yyyy = Number(objArtist.releaseDate.substring(0,4));
  var mm = Number(objArtist.releaseDate.substring(4,6));
  var dd = Number(objArtist.releaseDate.substring(6));
      
  this.formData.patchValue({
    artistId : objArtist.artistId,
    albumName : objArtist.albumName,
    artistName : objArtist.artistName,
    imageUrl : objArtist.imageUrl,
    price : objArtist.price,
    releaseDate : new Date(yyyy, mm - 1, dd),
    sampleUrl : objArtist.sampleUrl
  });
  
  this.formData.controls['artistId'].disable();
  
  
    });
  }

  IsValidate()
  {
    if (this.formData.value.albumName == "")
    {
      this.toast.error("Please input Album Name!", "Music System");
      return false;
    }
    if (this.formData.value.artistName == "")
    {
      this.toast.error("Please input Artist Name!", "Music System");
      return false;
    }

    if (this.formData.value.price == "")
    {
      this.toast.error("Please input Price!", "Music System");
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
    var artistsimpan = new Artist();
    artistsimpan.artistId = this.IsCreateMode ? 0 : this.formData.getRawValue().artistId;
    artistsimpan.releaseDate = this.service.FormatDateSave(this.formData.getRawValue().releaseDate);
    artistsimpan.albumName = this.formData.getRawValue().albumName;
    artistsimpan.artistName = this.formData.getRawValue().artistName;
    artistsimpan.imageUrl = this.formData.getRawValue().imageUrl;
    artistsimpan.price = Number(this.formData.getRawValue().price);
    artistsimpan.sampleUrl = this.formData.getRawValue().sampleUrl;



    console.log("Nilai artist simpan: ", artistsimpan);
    console.log("Nilai artist simpan json: ", JSON.stringify(artistsimpan));
    if (this.IsCreateMode)
 {
   this.service.MusicCreate(artistsimpan).subscribe( res => {

    this.toast.success('Artists has been registered!', 'Music System');
    this.router.navigate(['/MusicList']);

   });
 }
 else
 {
  this.service.MusicUpdate(this.formData.getRawValue().artistId, artistsimpan).subscribe( res => {
    this.toast.success('Artists has been updated!', 'Music System');
    this.router.navigate(['/MusicList']);

  });
 }
     

  }


}
