import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = "http://localhost:8085/student/"

  constructor(private http: HttpClient) { }

  public getAllStudents(): Observable<any> {
    return this.http.get(this.baseUrl + "getAllStudents", { observe: 'response' });
  }

  public getStateByCountryId(countryId: any): Observable<any> {
    return this.http.get(this.baseUrl + `getStateByCountryId/${countryId}`, { observe: 'response' });
  }

  public getDistrictByStateId(stateId: any): Observable<any> {
    return this.http.get(this.baseUrl + `getDistrictByStateId/${stateId}`, { observe: 'response' });
  }

  public saveStudent(student: any): Observable<any> {
    return this.http.post(this.baseUrl + 'saveStudent', student, { observe: 'response' });
  }

  public editStudent(studentId: any): Observable<any> {
    return this.http.patch(this.baseUrl + "editStudent/" + studentId, null, { observe: 'response' });
  }

}
