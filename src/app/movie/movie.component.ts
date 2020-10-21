import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../database.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieDB: any[] = [];

  section = 1;

  title:string="";
  year:number=0;
  actorsDB:any[]=[];
  
  actorId:string="";
  movieId:string="";

  constructor(private dbService: DatabaseService) { }
  onGetActors(){
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  onGetMovie(){
    this.dbService.getMovie().subscribe((data: any[]) => {
      this.movieDB = data;
    });
  }

  onSaveMovie(){
    let obj = { title: this.title, year: this.year };
    this.dbService.creatMovie(obj).subscribe(result => {
      this.onGetMovie();
    });
  }

  onDeleteMovie(item){
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovie();
    });
  }

  onDeleteByYear(){
    
    this.dbService.deleteByYear(this.year).subscribe(result => {
      this.onGetMovie();
    });
  }
  
  onAddActorToMovie(){
    this.dbService.addActorToMovie(this.movieId,this.actorId).subscribe(result=>{
      this.onGetMovie();
    })
  }

  

  ngOnInit() {
    this.onGetMovie();
    console.log(this.movieDB);
    this.onGetActors();
    console.log(this.actorsDB);

  }

  changeSection(sectionID){
    this.section = sectionID;
    this.resetValueOfMovie();
  }

  resetValueOfMovie(){
    this.title="";
    this.year=0;
    this.actorsDB=[]; 
    this.movieId="";
  }

}
