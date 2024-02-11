import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  public studentList: any;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  public getAllStudents(): void {
    this.studentService.getAllStudents().subscribe((response) => {
      console.log(response);
      console.log(response.body.studentList);

      this.studentList = response.body.studentList;
    });
  }

  public editStudent(studentId: any): void {
    this.studentService.editStudent(studentId).subscribe((response) => {
      console.log(response.body);

    });
  }

  public deleteStudent(): void {

  }

}
