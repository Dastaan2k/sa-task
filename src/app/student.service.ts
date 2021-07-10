import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";


export interface Student {
  id : number,
  name : string,
  course : string,
  isEditable : boolean,
}


@Injectable({providedIn: 'root'})
export class StudentService{

  constructor(private http: HttpClient,) { }

  studentDBUrl = 'api/students';


  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentDBUrl)
      .pipe(
        tap(_ => console.log('fetched student list')),
        catchError(this.handleError<Student[]>('getStudents', []))
      );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  enrollStudent(student:Student): Observable<Student> {
    return this.http.post<Student>(this.studentDBUrl, student, this.httpOptions).pipe(
      tap((newStudent: Student) => console.log(`added student w/ id=${newStudent.id}\nNew Student List : `)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  updateStudent(student: Student): Observable<any> {
    console.log("Updating student : ",student)
    return this.http.put(this.studentDBUrl, {id: student.id,name: student.name,course: student.course,isEditable: false}, this.httpOptions).pipe(
      tap(_ => console.log(`updated student id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  deleteStudent(student: Student): Observable<any> {
    console.log("Deleting student : ",student);
    return this.http.delete<Student>(this.studentDBUrl + "/" + student.id, this.httpOptions).pipe(
      tap(_ => console.log("Student deleted")),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }





 /* enrollStudent(student: Student) {
    this.studentList.push(student);
  }

  deleteStudent(student: Student) {
    for(let i =0;i<this.studentList.length;i++) {
      if(student === this.studentList[i]) {
        this.studentList.splice(i,1);
      }
    }
  }  */


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
