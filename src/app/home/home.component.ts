import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Student, StudentService} from "../student.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  studentBindList:any = {};

  displayedColumns = ['id','name','course','actions'];
  dataSource: Student[] = [];

  @ViewChild(MatTable) table?: MatTable<any>;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(students => {
      console.log("Fetching student list");
      this.dataSource = students;
      this.studentBindList = students;
    });
  }

  onUpdateClick(student: Student,index: number) {

    console.log("Index : ",this.studentBindList[index]);

    if(student.isEditable) {
      if(this.studentBindList[index]['name'] !== "" && (this.studentBindList[index]['course'] == "PCB" || this.studentBindList[index]['course'] == "PCM")){
        this.studentService.updateStudent(this.studentBindList[index]).subscribe(returnValue => {
          student.isEditable = false
        });
      }
      else {
        if(this.studentBindList[index]["name"] === "") {
          alert("Name first can't be kept empty");
        }
        else {
          alert("Course field should either be PCM or PCB");
        }
      }
    }
    else {
      student.isEditable = true;
    }

    //student.isEditable = !student.isEditable;
  }

  onDeleteClick(student: Student) {
    this.studentService.deleteStudent(student).subscribe(val => {
      console.log("DELETED");
      this.studentService.getStudents().subscribe(students => {
        console.log("Fetching student list ....");
        this.dataSource = students;
        this.studentBindList = students;
        this.table?.renderRows();
      })
    });
  }
}
