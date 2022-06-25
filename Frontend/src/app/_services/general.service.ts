import { DatePipe } from '@angular/common';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Client, ISoapMethodResponse, NgxSoapService } from 'ngx-soap';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
 
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
  providedIn: 'root'
})
export class GeneralService{
  client : Client;
  userClient : Client;
  populatorClient: Client;
  taskClient : Client;
  

  //Observable Object
  private actionEventSource = new BehaviorSubject<string>("null");
  private actionListEventSource = new BehaviorSubject<string>("null");
  private catEventSource = new BehaviorSubject<number>(0);

  protected actionExecEventSource = new BehaviorSubject<any>(null);
  protected actionDDLEventSource = new BehaviorSubject<any>(null);

  actionEvent = this.actionEventSource.asObservable();
  actionListEvent = this.actionListEventSource.asObservable();
  catEvent = this.catEventSource.asObservable();

  ddlEvent = this.actionDDLEventSource.asObservable();
  actionExecEvent = this.actionExecEventSource.asObservable();

  constructor(
    protected http : HttpClient,
    protected datePipe: DatePipe,
  ) {
  }

  fireDDLEventTrigger(event : any){
    
    this.actionDDLEventSource.next(event);
    console.log(event)
    //console.log('berhasil tangkap')
  }

  downloadFile(base64, namafile) {
    const linkSource = `data:application/octet-stream;base64,${base64}`;
    const downloadLink = document.createElement("a");
    const fileName = namafile;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  fireActionEventTrigger(event : any){
    this.actionExecEventSource.next(event);
  }

  downloadCanvas(canvasName, fileName)
  {
    const downloadLink = document.createElement("a");
    var canvas = document.getElementById(canvasName) as HTMLCanvasElement;
    var dataURL = canvas.toDataURL();
   // console.log("dataurl: ", dataURL);
    downloadLink.href = dataURL;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  FormatDateWithTime(strdate : any) {
  
    if (strdate == "" || strdate == null || strdate == undefined)
    return "";
  else
    return this.datePipe.transform(strdate,"dd-MMM-yyyy HH:mm");
  }
  
  FormatDateWithTimeSecond(strdate : any) {
    
    if (strdate == "" || strdate == null || strdate == undefined)
    return "";
  else
    return this.datePipe.transform(strdate,"dd-MMM-yyyy HH:mm:ss");
  }

  FormatDateWithTimeXML(strdate : any) {
    console.log("Lihat nilai masuk strdate utk datetime ", strdate);
    if (strdate == "" || strdate == null || strdate == undefined)
    return "";
  else
  {
    if (moment(new Date(strdate), "DD-MMM-YYYY").toString() == "Invalid date")
        return "";
    else
        return this.datePipe.transform(strdate,"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  }
  
   
    
  }

  FormatDateXML(strdate : any) {
    console.log("Lihat nilai masuk strdate ", strdate);
    if (strdate == "" || strdate == null || strdate == undefined)
    return "";
  else
  {
    if (moment(new Date(strdate), "DD-MMM-YYYY").toString() == "Invalid date")
        return "";
    else
        return this.datePipe.transform(strdate,"yyyy-MM-dd");
  }
  }

  makeString(jumlah:number): string {
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < jumlah; i++) {
  
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
  
    }
   
    return outString;
  }
    
    FormatDate(strdate : any) {
      if (strdate == "" || strdate == null || strdate == undefined)
      return "";
    else
      return this.datePipe.transform(strdate,"dd-MMM-yyyy");
    }

    formatDateYMDDisplay(strdate: string)
    {
      var yyyy = Number(strdate.substring(0,4));
      var mm = Number(strdate.substring(4,6));
      var dd = Number(strdate.substring(6));

      var tgl = new Date(yyyy, mm - 1, dd);
      return this.datePipe.transform(tgl,"dd-MMM-yyyy");
    }

    FormatDateSave(strdate : any) {
      if (strdate == "" || strdate == null || strdate == undefined)
      return "";
    else
      return this.datePipe.transform(strdate,"yyyyMMdd");
    }

    playSound(source)
    {
      let audio = new Audio();
      audio.src = source;
      audio.load();
      audio.play();
    }

    stopSound()
    {
      let audio = new Audio();
      //audio.src = source;
      audio.pause();
      audio.currentTime = 0;
    }


  actionEventTrigger(event : string){
    this.actionEventSource.next(event);
  }

  actionListEventTrigger(event : string){
    this.actionListEventSource.next(event);
  }

  catEventTrigger(event : number){
    this.catEventSource.next(event)
  }

  getCurrentUser(){
    if(localStorage.getItem('CurrentUser')){
      //this.currentUser = JSON.parse(atob(localStorage.getItem('CurrentUser')));   
         
    }
  }
   
}