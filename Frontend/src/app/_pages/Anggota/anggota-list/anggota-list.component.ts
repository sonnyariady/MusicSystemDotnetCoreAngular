import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormPopulatorService } from 'src/app/_services/form-populator.service';
import { TaskToDoService } from 'src/app/_services/task-to-do.service';

@Component({
  selector: 'app-anggota-list',
  templateUrl: './anggota-list.component.html',
  styleUrls: ['./anggota-list.component.css']
})
export class AnggotaListComponent implements OnInit {
ListData;
  constructor(
    private service : FormPopulatorService
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  

  refreshData()
  {
    this.service.getAnggotaList().then(res => {
      console.log("Lihat res: ", res);
      this.ListData = res;
      
    });
    console.log("list data: ", this.ListData);
  }

}
