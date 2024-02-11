import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  public student: any;
  public departmentList: any;
  public countryList: any;
  public stateList: any;
  public districtList: any;

  constructor(private studentService: StudentService, private formBuilder: FormBuilder) {
    this.student = formBuilder.group({
      studentId: formBuilder.control(''),
      studentName: formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      studentDob: formBuilder.control('', [Validators.required]),
      studentGender: formBuilder.control('', [Validators.required]),
      studentMobile: formBuilder.control('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      studentEmail: formBuilder.control('', [Validators.required, Validators.email]),
      department: formBuilder.group({
        departmentId: formBuilder.control('', [Validators.required]),
        departmentName: formBuilder.control(''),
      }),
      country: formBuilder.group({
        countryId: formBuilder.control('', [Validators.required]),
        countryName: formBuilder.control(''),
      }),
      state: formBuilder.group({
        stateId: formBuilder.control('', [Validators.required]),
        stateName: formBuilder.control(''),
      }),
      district: formBuilder.group({
        districtId: formBuilder.control('', [Validators.required]),
        districtName: formBuilder.control(''),
      })
    });
  }

  ngOnInit(): void {
    this.getAllStudents();

    //Get State List when somoe changes happens in country dropdown
    this.student.get('country.countryId').valueChanges.subscribe((countryId: any) => {
      if (countryId != null) {
        this.studentService.getStateByCountryId(countryId).subscribe((response) => {
          this.stateList = response.body;
        });
      }
    });

    //Get District List when somoe changes happens in State dropdown
    this.student.get('state.stateId').valueChanges.subscribe((stateId: any) => {
      if (stateId != null) {
        this.studentService.getDistrictByStateId(stateId).subscribe((response) => {
          this.districtList = response.body;
        });
      }
    });
  }


  public getAllStudents(): void {
    this.studentService.getAllStudents().subscribe((response) => {
      this.departmentList = response.body.departmentList;
      this.countryList = response.body.countryList;
    });
  }


  public submitClicked(): void {
    if (this.student.invalid) {
      Swal.fire({
        title: 'Please Fill The Form Correctly',
        text: '',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 3000
      });
    }
  }



  public saveStudent(): void {
    console.log(this.student.value);
    if (this.student.valid) {
      this.studentService.saveStudent(this.student.value).subscribe((response) => {
        if (response.status === 201) {
          Swal.fire({
            title: 'Saved',
            text: '',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 3000
          });
        }
      });
    }

  }




}
