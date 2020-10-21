import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) {}
  result: any;

  getActors() {
    return this.http.get("/actors");
  }
  
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }


  //////////////////////////

  
  getMovie(){
    return this.http.get("/movies");
  }

  creatMovie(data){
    return this.http.post("/movies", data, httpOptions);
  }

  deleteMovie(itemId){
    let url = "/movies/" + itemId;
    return this.http.delete(url, httpOptions);
  }

  deleteByYear(aYear){
    let url = "/movies/by-year/" + aYear;
    return this.http.delete(url, httpOptions);
  }

  addActorToMovie(name,title){
    let url = "/movies/addActor/" + name + "/" + title;
    return this.http.put(url, httpOptions);
  }
}
