import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-listmovies',
  templateUrl: './listmovies.component.html',
  styleUrls: ['./listmovies.component.css']
})
export class ListmoviesComponent implements OnInit {

  movieDB: any[] = [];

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {

    console.log("Hi From ListMovies ngIOnit");

    this.dbService.getMovie().subscribe((data: any[]) => {
      this.movieDB = data;
    })
  }

}
