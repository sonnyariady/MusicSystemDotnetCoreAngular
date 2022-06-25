import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buku-create',
  templateUrl: './buku-create.component.html',
  styleUrls: ['./buku-create.component.css']
})
export class BukuCreateComponent implements OnInit {
  IsCreateMode : boolean;
  JudulTransaksi : string;

  constructor(
    private fb : FormBuilder,
    private toast : ToastrService,
    private currentRoute: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

}
