import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';



@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  submitted: boolean = false
  constructor(public service: EmployeeService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.submitted = true;
    if (this.service.employeeForm.valid) {
      if (this.service.employeeForm.get('_id')?.value == '') {
        this.service.postEmp().subscribe(res => {
          this.service.fetchEmployeeList();

          this.resetForm();
        })
      }else {
        this.service.putEmp().subscribe(res => {
          this.service.fetchEmployeeList();

          this.resetForm();
        })
      }

    }
  }

  resetForm() {
    this.service.employeeForm.reset(new Employee())
    this.submitted = false
  }
}
