import { Component, OnInit } from '@angular/core';
import { FormPopulatorService } from 'src/app/_services/form-populator.service';

@Component({
  selector: 'app-buku-list',
  templateUrl: './buku-list.component.html',
  styleUrls: ['./buku-list.component.css']
})
export class BukuListComponent implements OnInit {

  ListData;

  constructor(
    private service : FormPopulatorService
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData()
  {
    this.service.getBukuList().then(res => {
      console.log("Lihat res: ", res);
      this.ListData = res;
      
    });
    console.log("list data: ", this.ListData);
  }

}
