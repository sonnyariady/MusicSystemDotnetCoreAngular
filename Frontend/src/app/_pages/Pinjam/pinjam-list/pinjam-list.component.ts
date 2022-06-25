import { Component, OnInit } from '@angular/core';
import { TaskToDoService } from 'src/app/_services/task-to-do.service';

@Component({
  selector: 'app-pinjam-list',
  templateUrl: './pinjam-list.component.html',
  styleUrls: ['./pinjam-list.component.css']
})
export class PinjamListComponent implements OnInit {

  ListData;

  constructor(
    private service : TaskToDoService
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData()
  {
    this.service.getPinjamList().then(res => {
      console.log("Lihat res: ", res);
      this.ListData = res;
      
    });
    console.log("list data: ", this.ListData);
  }

  DisplayActionButton(ObjPinjam)
  {
    var teksbutton = "";
    if (ObjPinjam.tglKembali == "")
    {
      teksbutton = "Pengembalian";
    }
    else
    {
      teksbutton = "Lihat Data";
    }
    return teksbutton;
  }

}
