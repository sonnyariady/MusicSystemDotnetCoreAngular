import { BukuViewModel } from "./buku-view-model.model";

export class PinjamHeaderModel {
     noPinjam : string = "";
     idPetugas : string = "";
      noAnggota : string = "";
      tglPinjam : string = "";
      tglKembali : string = "";

      namaPetugas: string = "";

      namaAnggota : string = "";

      detailPinjam : BukuViewModel[] = [];
    
}
