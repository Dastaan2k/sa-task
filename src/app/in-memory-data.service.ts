import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Student} from "./student.service";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const students = [
      {id: 1,name: "Sarvesh Dalvi",course: "PCM",isEditable: false}
    ];
    return {students};
  }

  genId(students: Student[]): number {
    return students.length > 0 ? Math.max(...students.map(student => student.id)) + 1 : 1;
  }
}
