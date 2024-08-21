import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private firebaseUrl = 'https://frizer-be310-default-rtdb.europe-west1.firebasedatabase.app/appointments.json';

  constructor(private http: HttpClient) {}

  addAppointment(email: string, employee: string, date: string, time: string): Observable<void> {
    const appointment = {
      email,
      employee,
      date,
      time
    };
    return this.http.post<void>(this.firebaseUrl + this.getAuthParams(), appointment);
  }

  private getAuthParams(): string {
    const token = localStorage.getItem('userToken');
    if (!token) {
      throw new Error('User is not authenticated.');
    }
    return `?auth=${token}`;
  }
}

