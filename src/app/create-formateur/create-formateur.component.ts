import { FormateurService } from '../formateur.service';
import { Formateur } from '../formateur';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-formateur',
  templateUrl: './create-formateur.component.html',
  styleUrls: ['./create-formateur.component.css']
})
export class CreateFormateurComponent implements OnInit {

  formateur: Formateur = new Formateur();
  submitted = false;

  constructor(private formateurService: FormateurService,
    private router: Router) { }

  ngOnInit() {
  }

  newFormateur(): void {
    this.submitted = false;
    this.formateur = new Formateur();
  }

  save() {
    this.formateurService
    .createForamteur(this.formateur).subscribe(data => {
      console.log(data)
      this.formateur= new Formateur();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();   
   
  }

  gotoList() {
    this.router.navigate(['listformateur']);
  }
vider(){

    return {
    
      nomFormateur: "",
    specialite: "",
    direction: "",
    
    };
  }
}

