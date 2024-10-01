import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private firebaseUrl = 'https://frizer-be310-default-rtdb.europe-west1.firebasedatabase.app/appointments.json';

  constructor(private http: HttpClient) {}

  // In appointment.service.ts
getAppointmentsByEmployeeAndDate(employeeName: string, date: string): Observable<any[]> {
  const queryParams = `${this.getAuthParams()}&orderBy="employee"&equalTo="${employeeName}"`;
  return this.http.get<Record<string, any>>(this.firebaseUrl + queryParams).pipe(
    map(appointmentsData => {
      if (!appointmentsData) return [];
      const filteredAppointments = Object.values(appointmentsData)
      .filter(appointment => appointment.employee === employeeName && appointment.date === date);

      console.log('Filtered Appointments:', filteredAppointments);
      
      return filteredAppointments;
    })
  );
}


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

  //zipa ovde

  getUserAppointments(userEmail: string): Observable<any[]> {
    return this.http.get<Record<string, any>>(this.firebaseUrl + this.getAuthParams()).pipe(
      map(appointmentsData => {
        if (!appointmentsData) return [];
        return Object.values(appointmentsData)
          .filter((appointment: any) => appointment.email === userEmail)
          .map((appointment: any) => ({
            ...appointment,
            date: this.parseDate(appointment.date) 
          }));
      })
    );
  }

  private parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day); 
  }

}

