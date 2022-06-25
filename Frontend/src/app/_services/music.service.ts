import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GeneralService } from './general.service';
import { Artist } from '../_models/artist.model';

@Injectable({
  providedIn: 'root'
})

export class MusicService extends GeneralService {

  constructor(
    protected http : HttpClient,
    protected datePipe: DatePipe,
  ) { 
    super(http, datePipe);
  }
  loadClient(){
    
  }

  getMusicList() {
    const body = {

    };
    return this.http.get(environment.apiURL + 'Music/GetAll').toPromise();
  }

  getArtistById(id)
  {
    return this.http.get(environment.apiURL + 'Music/' + id).toPromise();
  }

MusicCreate(data : Artist)
  {
    
    const body = {
      
      albumName : data.albumName,
      artistName : data.artistName,
      imageUrl : data.imageUrl,
      price : data.price,
      releaseDate : data.releaseDate,
      sampleUrl : data.sampleUrl

    };

    return this.http.post(environment.apiURL + 'Music/Create',body);
  }

  MusicUpdate(id, data : Artist)
  {
     
    const body = {
      
      albumName : data.albumName,
      artistName : data.artistName,
      imageUrl : data.imageUrl,
      price : data.price,
      releaseDate : data.releaseDate,
      sampleUrl : data.sampleUrl

    };

    return this.http.put(environment.apiURL + 'Music/' + id + '/' + 'Update',body);
  }

  MusicDelete(id)
  {
    return this.http.delete(environment.apiURL + 'Music/' + id);
  }

}
