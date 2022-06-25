import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormPopulatorService } from 'src/app/_services/form-populator.service';

@Component({
  selector: 'app-buku-lookup',
  templateUrl: './buku-lookup.component.html',
  styleUrls: ['./buku-lookup.component.css']
})
export class BukuLookupComponent implements OnInit {
ListData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private service : FormPopulatorService,
    public dialogRef: MatDialogRef<BukuLookupComponent>
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

  SelectItemLookup(ObjBuku)
  {
    this.dialogRef.close({
      message: 'Confirm',
      ObjBuku : ObjBuku,
      IsDataChange : 1
    });
  }

  CloseWindows()
  {
    this.dialogRef.close({
      message: 'Confirm',
      ObjBuku : null,
      IsDataChange : 0
    });
  }


}
