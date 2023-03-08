import { Employee } from './employee.model';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }


  readonly baseURL = 'http://localhost:8080/employee/'

  list:Employee[] = []
  employeeForm = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    position: ['', Validators.required],
    office:[''],
    salary: ['', Validators.required]
  })


  fetchEmployeeList(){
    this.http.get(this.baseURL).pipe(catchError(this.errorHandler)).subscribe((data)=>{
      this.list=data as Employee[]
    })
  }

  postEmp() {
    return this.http.post(this.baseURL, this.employeeForm.value).pipe(catchError(this.errorHandler))
  }

  putEmp(){
    return this.http.put(this.baseURL + this.employeeForm.get('_id')?.value , this.employeeForm.value)
    .pipe(catchError(this.errorHandler))

  }

  delEmp(_id:string){
    return this.http.delete(this.baseURL + _id)
    .pipe(catchError(this.errorHandler))

  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(`An Error occured : `, error.error);

    } else {
      console.error(`backend returned code ${error.status} , body was : `, error.error);


    }

    return throwError(() => new Error(`Something bad happend please try again later `))
  }

}


