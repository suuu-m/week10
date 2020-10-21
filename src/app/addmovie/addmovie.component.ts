import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

  title: string = "";
  year: number = 0;
  movieId: string = "";

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
  }

  onSaveMovie(){
    let obj = { title: this.title, year: this.year};
    this.dbService.creatMovie(obj).subscribe(result =>{
      this.router.navigate(["/listmovies"]);
    })
  }
}
