import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
 
import { AuthGuard } from './_interceptor/auth.guard';
 
import { MusicCreateComponent } from './_pages/Artist/music-create/music-create.component';
import { MusicListComponent } from './_pages/Artist/music-list/music-list.component';
 

 
import { ForbiddenComponent } from './_pages/forbidden/forbidden.component';
import { HomeComponent } from './_pages/home/home.component';
 
import { NotFoundComponent } from './_pages/not-found/not-found.component';
 
 

 //antRoomDetailListComponent } from './_pages/Accomodation/occupant-room-detail-list/occupant-room-detail-list.component';

const routes: Routes = [
  {path: "",  component: MusicListComponent, pathMatch: "full"},
  {path:'MusicList',component:MusicListComponent},
  {path:'MusicCreate',component:MusicCreateComponent},
  {path:'MusicEdit/:id',component:MusicCreateComponent},
  {path: '', component:HomeComponent, 
  children:[
    // ,data:{allowedRoles:['Root','Admin']}
  //  {path:'MusicCreate',component:MusicCreateComponent},
   // {path:'MusicEdit/:id',component:MusicCreateComponent},
    //{path:'home',component:HomeComponent},
  
  ]
  },
 
  {path:'forbidden',component:ForbiddenComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'**',redirectTo:'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
