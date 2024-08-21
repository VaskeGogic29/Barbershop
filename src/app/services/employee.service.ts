import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private firebaseUrl = 'https://frizer-be310-default-rtdb.europe-west1.firebasedatabase.app/employees.json';

  constructor(private http: HttpClient) {}

  private getAuthParams(): string {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('User is not authenticated.');
    }
    return `?auth=${token}`;
  }


  getEmployees(): Observable<Employee[]> {
    return this.http.get<Record<string, Omit<Employee, 'id'>>>(this.firebaseUrl + this.getAuthParams()).pipe(
      map(data => {
        if (!data) {
          return []; // Return an empty array if data is null or undefined
        }
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      })
    );
  }

  

  addEmployee(employee: Omit<Employee, 'id'>): Observable<string> {
    return this.http.post<{ name: string }>(this.firebaseUrl + this.getAuthParams(), employee).pipe(
      map(response => response.name) 
    );
  }

  updateEmployee(employee: Employee): Observable<void> {
    const url = `https://frizer-be310-default-rtdb.europe-west1.firebasedatabase.app/employees/${employee.id}.json${this.getAuthParams()}`;
    return this.http.put<void>(url, employee);
  }

  

  deleteEmployee(id: string): Observable<void> {
    const url = `https://frizer-be310-default-rtdb.europe-west1.firebasedatabase.app/employees/${id}.json${this.getAuthParams()}`;
    return this.http.delete<void>(url).pipe(
      catchError(error => {
        console.error('Delete error:', error);
        return throwError(error);
      })
    );
  }
  
}
