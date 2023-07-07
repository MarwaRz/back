import { Observable } from "rxjs";
import { FormateurService } from "./../formateur.service";
import { Formateur } from "./../formateur";
import { Component, OnInit } from "@angular/core";
import { Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: "app-list-Formateur",
  templateUrl: "./list-Formateur.component.html",
  styleUrls: ["./list-Formateur.component.css"]
})
export class ListFormateurComponent implements OnInit {
  formateurs: Observable<Formateur[]>;
  showLoadMoreProductButton = false;
  showTable = false;
  pageNumber: number = 0;
  productDetails : Formateur[] =[];
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description',  'Product Actual Price' ,'Actions'];
  constructor(private formateurService: FormateurService,private route: ActivatedRoute,
    private router: Router) {}
    id: number; 
    p: number = 1;
    formateur: Formateur;
    formateurDetails : Formateur[] =[];
  ngOnInit() {
    this.reloadData();
  }




 





  

  reloadData() {
    this.formateurs = this.formateurService.getFormateurList();
  }

  deleteFormateur(id: number) {
    this.formateurService.deleteFormateur(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  searchByKeyword(searchkeyword){

    this.pageNumber= 0;
    this.formateurDetails= [];
    this.formateurService.getAllFormateurs(searchkeyword);

  }

  updateFormateur(id: number){
    this.router.navigate(['modifierformateur', id]);
  }
}
