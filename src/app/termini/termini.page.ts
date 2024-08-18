import { Component, OnInit } from '@angular/core';

interface Appointment {
  employee: string;
  date: Date;
  time: string;
}

@Component({
  selector: 'app-termini',
  templateUrl: './termini.page.html',
  styleUrls: ['./termini.page.scss'],
})
export class TerminiPage implements OnInit {
  appointments: Appointment[] = [
    { employee: 'Vlada', date: new Date('2024-08-20'), time: '12:00' },
    { employee: 'Sale', date: new Date('2024-08-12'), time: '14:00' },
    { employee: 'Ivana', date: new Date('2024-08-25'), time: '10:00' },
  ];

  upcomingAppointments: Appointment[] = [];
  pastAppointments: Appointment[] = [];

  constructor() {}

  ngOnInit() {
    const currentDate = new Date();
    this.appointments.forEach((appointment) => {
      if (appointment.date >= currentDate) {
        this.upcomingAppointments.push(appointment);
      } else {
        this.pastAppointments.push(appointment);
      }
    });
  }
}

