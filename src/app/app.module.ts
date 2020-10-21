import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ActorComponent } from './actor/actor.component';
import { MovieComponent } from './movie/movie.component';
import { DatabaseService } from './database.service';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { RouterModule, Routes } from '@angular/router';
import { AddactortomovieComponent } from './addactortomovie/addactortomovie.component';
import { ViewnotfoundComponent } from './viewnotfound/viewnotfound.component';

const week10Routes: Routes = [
  {path: 'addmovie', component: AddmovieComponent},
  {path: 'deletemovie', component: DeletemovieComponent},
  {path: 'listmovies', component: ListmoviesComponent},
  {path: 'addactortomovie', component: AddactortomovieComponent},
  {path: "", redirectTo: "/listmovies", pathMatch: "full"},
  {path: "**", component: ViewnotfoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ActorComponent,
    MovieComponent,
    AddmovieComponent,
    DeletemovieComponent,
    ListmoviesComponent,
    AddactortomovieComponent,
    ViewnotfoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(week10Routes, {useHash: true})
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
