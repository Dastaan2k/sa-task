import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreateStudentComponent} from "./create-student/create-student.component";

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'create',component: CreateStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
