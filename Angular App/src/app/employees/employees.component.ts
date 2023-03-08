import { Employee } from './../shared/employee.model';
import { EmployeeService } from './../shared/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(    public service:EmployeeService
    ) { }

  ngOnInit(): void {
    this.service.fetchEmployeeList()
  }

  populateForm(selectedRecord :Employee){
    this.service.employeeForm.setValue({
      _id:selectedRecord._id,
      name:selectedRecord.name,
      office:selectedRecord.office,
      position:selectedRecord.position,
      salary:selectedRecord.salary
    })
  }


  onDelete(_id:string){
    if(confirm('Are You Sure?!')){
      this.service.delEmp(_id).subscribe(()=>{
        this.service.fetchEmployeeList()
      })
    }
  }
}
