import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-addactortomovie',
  templateUrl: './addactortomovie.component.html',
  styleUrls: ['./addactortomovie.component.css']
})
export class AddactortomovieComponent implements OnInit {

  movieDB: any[] = [];
  actorsDB: any [] = [];
  name: string = "";
  title: string = "";
  bYear: number = 0;
  year: number = 0;
  selectedActor = null;
  selectedMovie = null;


  actorId:string="";
  movieId:string="";
  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.onGetMovie();
    this.onGetActors();
  }

  onGetMovie(){
    console.log("Form on GetMovies");
      this.dbService.getMovie().subscribe((data: any[]) => {
      this.movieDB = data;
    })
  }

  onGetActors() {
      this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  onSelectMovie(item){
    this.title = item.title; 
    this.year = item.year; 
    this.movieId = item._id;
  }

  onSelectActor(item) {
    this.name = item.name; 
    this.bYear = item.bYear; 
    this.actorId = item._id;
  }

  selectActor(actor){
    this.selectedActor = actor;
  }

  selectMovie(movie){
    this.selectedMovie = movie;
  }

  onAddActorToMovie(){
    this.dbService.addActorToMovie(this.movieId, this.actorId).subscribe(result => {
      this.onGetMovie();
      this.router.navigate(["/listmovies"]);
    });
  }

}
