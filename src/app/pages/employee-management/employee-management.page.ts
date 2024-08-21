import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service'; // Ensure this path is correct
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.page.html',
  styleUrls: ['./employee-management.page.scss'],
})
export class EmployeeManagementPage implements OnInit {
  employees: Employee[] = [];
  newEmployeeName: string = ''; 

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }


  addEmployee() {
    if (this.newEmployeeName.trim().length > 0) {
      const newEmployee: Omit<Employee, 'id'> = { name: this.newEmployeeName };
      this.employeeService.addEmployee(newEmployee).subscribe((id) => {
        this.newEmployeeName = ''; 
        // After adding, reload employees or add the new employee to the list directly
        this.loadEmployees(); 
      });
    }
  }

  updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe(() => {
      this.loadEmployees(); 
    });
  }

  

  deleteEmployee(employeeId: string) {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      () => {
        this.loadEmployees(); // Refresh the list after deletion
      },
      error => {
        console.error('Delete operation failed:', error);
      }
    );
  }
}
