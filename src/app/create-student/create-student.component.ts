import { Component, OnInit } from '@angular/core';
import {Student, StudentService} from "../student.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {

  nameController: string = "";
  courseController: string = "";

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
  }

  onEnrollClick() {
    if(this.nameController !=="" && (this.courseController === "PCM" || this.courseController === "PCB")){
      this.studentService.enrollStudent({name: this.nameController,course: this.courseController} as Student).subscribe(student => {
        //this.heroes.push(hero);
      });
      this.router.navigate(['']);
    }
    else {
      if(this.nameController === "") {
        alert("Name field can't be kept empty !!!");
      }
      else {
        alert("Course should either be PCM or PCB");
      }
    }
  }

}
