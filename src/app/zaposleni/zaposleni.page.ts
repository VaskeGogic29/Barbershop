// import { Component, OnInit } from '@angular/core';
// import { registerLocaleData } from '@angular/common';
// import localeSr from '@angular/common/locales/sr';
// import { AlertController } from '@ionic/angular';
// import { EmployeeService } from '../services/employee.service';
// import { Employee } from '../models/employee.model';
// import { AuthService } from '../auth/auth.service';
// import { AppointmentService } from '../services/appointment.service';


// @Component({
//   selector: 'app-zaposleni',
//   templateUrl: './zaposleni.page.html',
//   styleUrls: ['./zaposleni.page.scss'],
// })
// export class ZaposleniPage implements OnInit {
  

//   employees: Employee[] = [];
//   selectedEmployee: Employee | null = null;
//   selectedDate: string | null = null; 
//   bookedSlots: string[] = [];//novo odbrana

//   timeSlots = [
//     '10:00', '10:30',
//     '11:00', '11:30', '12:00', '12:30',
//     '13:00', '13:30', '14:00', '14:30',
//     '15:00', '15:30', '16:00', '16:30',
//     '17:00', '17:30', '18:00', '18:30'
//   ];

//   constructor(
//     private alertController: AlertController,
//     private employeeService: EmployeeService,
//     private appointmentService: AppointmentService,
//     private authService: AuthService
//   ) {}

//   ngOnInit() {
//     registerLocaleData(localeSr);
//     this.fetchEmployees(); 
//   }


  
//   fetchEmployees() {
//     this.employeeService.getEmployees().subscribe(
//       (employees) => {
//         this.employees = employees;
//       },
//       (error) => {
//         console.error('Error fetching employees:', error);
//       }
//     );
//   }

//   selectEmployee(employee: any) {
//     this.selectedEmployee = employee;
//   }

//   onDateChange(event: any) {
//     this.selectedDate = event.detail.value;
//     console.log('Selected date:', this.selectedDate);
//   }

//   selectTime(time: string) {
//     if (!this.selectedEmployee) {
//       console.log('Please select an employee.');
      
//       this.showAlert('Greška', 'Molimo Vas odaberite frizera pre nego što izaberete termin.');
//       return;
//     }
  
//     if (!this.selectedDate) {
//       console.log('Please select a date.');
      
//       this.showAlert('Greška', 'Molimo Vas odaberite datum pre nego što izaberete termin.');
//       return;
//     }
  
//     const selectedDate = new Date(this.selectedDate).toLocaleDateString('sr-RS'); 
//     const selectedEmployee = this.selectedEmployee.name;
//     this.presentConfirmAlert(selectedEmployee, selectedDate, time);
//   }

//   async showAlert(header: string, message: string) {
//     const alert = await this.alertController.create({
//       header,
//       message,
//       buttons: ['U redu']
//     });
  
//     await alert.present();
//   }

//   backToEmployeeList() {
//     this.selectedEmployee = null;
//     this.selectedDate = null; 
//   }

//   async presentConfirmAlert(employee: string, date: string, time: string) {
//     const alert = await this.alertController.create({
//       header: 'Potvrda termina',
//       message: `Frizer: ${employee}\nDatum: ${date}\nTermin: ${time}\n\nDa li potvrdjujete termin?`,
//       buttons: [
//         {
//           text: 'Otkaži',
//           role: 'cancel',
//           cssClass: 'secondary'
//         },
//         {
//           text: 'U redu',
//           handler: () => {
//             this.confirmAppointment(employee, date, time);
//           }
//         }
//       ]
//     });
  
//     await alert.present();
//   }

//   confirmAppointment(employee: string, date: string, time: string) {
//     console.log(`Confirmed appointment with ${employee} on ${date} at ${time}`);
//     const userEmail = this.authService.getUserEmail();
//     if (userEmail) {
//       this.appointmentService.addAppointment(userEmail, employee, date, time).subscribe(
//         () => {
//           console.log(`Appointment confirmed with ${employee} on ${date} at ${time}`);
//           this.showAlert('Uspešno', 'Vaš termin je uspešno zakazan.');
//           this.backToEmployeeList();
//         },
//         (error) => {
//           console.error('Error saving appointment:', error);
//           this.showAlert('Greška', 'Došlo je do greške prilikom zakazivanja termina.');
//         }
//       );
//     } else {
//       this.showAlert('Greška', 'Niste prijavljeni.');
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeSr from '@angular/common/locales/sr';
import { AlertController } from '@ionic/angular';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { AuthService } from '../auth/auth.service';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-zaposleni',
  templateUrl: './zaposleni.page.html',
  styleUrls: ['./zaposleni.page.scss'],
})
export class ZaposleniPage implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  selectedDate: string | null = null;
  bookedSlots: string[] = [];
  availableTimeSlots: string[] = [];

  timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  constructor(
    private alertController: AlertController,
    private employeeService: EmployeeService,
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    registerLocaleData(localeSr);
    this.fetchEmployees(); 
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.employees = employees;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    console.log('Selected date:', this.selectedDate);
    if (this.selectedEmployee && this.selectedDate) {
      this.filterAvailableTimeSlots();
    }
  }

  selectEmployee(employee: any) {
    this.selectedEmployee = employee;
    if (this.selectedDate) {
      this.filterAvailableTimeSlots();
    }
  }

  filterAvailableTimeSlots() {
    if (!this.selectedEmployee || !this.selectedDate) {
      console.error('Employee or Date not selected.');
      return;
    }
  
    // Ensure the date is parsed correctly
    const dateObj = new Date(this.selectedDate);
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid Date:', this.selectedDate);
      return;
    }
  
    const selectedDateFormatted = dateObj.toLocaleDateString('sr-RS'); // Ensure format matches database
    
    this.appointmentService.getAppointmentsByEmployeeAndDate(this.selectedEmployee.name, selectedDateFormatted)
      .subscribe(appointments => {
        const bookedTimes = appointments.map(appointment => appointment.time);
        this.availableTimeSlots = this.timeSlots.filter(time => !bookedTimes.includes(time));
      }, error => {
        console.error('Error fetching appointments:', error);
      });
  }
  

  


  loadBookedSlots(employee: string, date: string) {
    this.appointmentService.getAppointmentsByEmployeeAndDate(employee, date).subscribe(
      (appointments) => {
        this.bookedSlots = appointments.map(appointment => appointment.time);
        this.filterAvailableSlots();
      },
      (error) => {
        console.error('Error fetching booked slots:', error);
      }
    );
  }

  filterAvailableSlots() {
    if (this.bookedSlots.length > 0) {
      this.timeSlots = this.timeSlots.filter(time => !this.bookedSlots.includes(time));
    }
  }

  selectTime(time: string) {
    if (!this.selectedEmployee) {
      this.showAlert('Greška', 'Molimo Vas odaberite frizera pre nego što izaberete termin.');
      return;
    }
  
    if (!this.selectedDate) {
      this.showAlert('Greška', 'Molimo Vas odaberite datum pre nego što izaberete termin.');
      return;
    }
  
    const selectedDate = new Date(this.selectedDate).toLocaleDateString('sr-RS'); 
    const selectedEmployee = this.selectedEmployee.name;
    this.presentConfirmAlert(selectedEmployee, selectedDate, time);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['U redu']
    });
  
    await alert.present();
  }

  backToEmployeeList() {
    this.selectedEmployee = null;
    this.selectedDate = null; 
    this.bookedSlots = [];
    this.timeSlots = [
      '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
    ];
  }

  async presentConfirmAlert(employee: string, date: string, time: string) {
    const alert = await this.alertController.create({
      header: 'Potvrda termina',
      message: `Frizer: ${employee}\nDatum: ${date}\nTermin: ${time}\n\nDa li potvrdjujete termin?`,
      buttons: [
        {
          text: 'Otkaži',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'U redu',
          handler: () => {
            this.confirmAppointment(employee, date, time);
          }
        }
      ]
    });
  
    await alert.present();
  }

  confirmAppointment(employee: string, date: string, time: string) {
    const userEmail = this.authService.getUserEmail();
    if (userEmail) {
      this.appointmentService.addAppointment(userEmail, employee, date, time).subscribe(
        () => {
          this.showAlert('Uspešno', 'Vaš termin je uspešno zakazan.');
          this.backToEmployeeList();
        },
        (error) => {
          console.error('Error saving appointment:', error);
          this.showAlert('Greška', 'Došlo je do greške prilikom zakazivanja termina.');
        }
      );
    } else {
      this.showAlert('Greška', 'Niste prijavljeni.');
    }
  }
}
