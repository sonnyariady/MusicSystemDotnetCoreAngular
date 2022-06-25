import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Artist } from 'src/app/_models/artist.model';
import { MusicService } from 'src/app/_services/music.service';

@Component({
  selector: 'app-play-music-lookup',
  templateUrl: './play-music-lookup.component.html',
  styleUrls: ['./play-music-lookup.component.css']
})
export class PlayMusicLookupComponent implements OnInit {

ImageUrl : string = "";
SampleUrl : string = "";
AlbumName : string = "";
ArtistName : string = "";
   
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private fb : FormBuilder,
    private service : MusicService,
    public dialogRef: MatDialogRef<PlayMusicLookupComponent>
  ) { }

  ngOnInit(): void {
    console.log("Buka popup isinya: ", this.data);

    var objArtist = this.data as Artist;

    this.AlbumName = objArtist.albumName;
    this.ArtistName = objArtist.artistName;
    this.ImageUrl = objArtist.imageUrl;
    this.SampleUrl = objArtist.sampleUrl;

    this.service.playSound(this.SampleUrl );

  }

  CloseWindows()
  {
    this.service.stopSound();
    
    this.dialogRef.close({
      message: 'Confirm'
    });
  }

}
