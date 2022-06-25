import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/_services/music.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlayMusicLookupComponent } from '../../Popups/play-music-lookup/play-music-lookup.component';
import { Artist } from 'src/app/_models/artist.model';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {

  ListData;




  constructor(
    private service : MusicService,
    private dialog: MatDialog,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData()
  {
    this.service.getMusicList().then(res => {
      console.log("Lihat res: ", res);
      this.ListData = res;
      
    });
    console.log("list data: ", this.ListData);
  }

  formatDateYMDDisplay(tgl)
  {
    return this.service.formatDateYMDDisplay(tgl);
  }

  openPopupPlay(objArtist: Artist)
  {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "80%";
    dialogConfig.height = "90%";
    dialogConfig.data = objArtist;
    this.dialog.open(PlayMusicLookupComponent, dialogConfig).afterClosed().subscribe(res => {
       
  
    });
  
  }

  DeleteItem(Id)
  {
    if (confirm("Are you sure to delete this item?"))
    {
      this.service.MusicDelete(Id).subscribe( res => {

      
          this.refreshData();
    
       });
    }
    

  }

}
