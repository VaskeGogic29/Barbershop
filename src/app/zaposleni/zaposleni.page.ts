import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeSr from '@angular/common/locales/sr';
import { AlertController } from '@ionic/angular';
import { EmployeeService } from '../services/employee.service';//pazi ovde
import { Employee } from '../models/employee.model';//pazi ovde
//pazi ovoo
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

  timeSlots = [
    '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30'
  ];

  constructor(
    private alertController: AlertController,
    private employeeService: EmployeeService,
    //pazi ovde
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

  selectEmployee(employee: any) {
    this.selectedEmployee = employee;
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    console.log('Selected date:', this.selectedDate);
  }

  selectTime(time: string) {
    if (!this.selectedEmployee) {
      console.log('Please select an employee.');
      
      this.showAlert('Greška', 'Molimo Vas odaberite frizera pre nego što izaberete termin.');
      return;
    }
  
    if (!this.selectedDate) {
      console.log('Please select a date.');
      
      this.showAlert('Greška', 'Molimo Vas odaberite datum pre nego što izaberete termin.');
      return;
    }
  
    const selectedDate = new Date(this.selectedDate).toLocaleDateString('sr-RS'); // Formatiraj 'DD.MM.YYYY'
    const selectedEmployee = this.selectedEmployee.name;
    this.presentConfirmAlert(selectedEmployee, selectedDate, time);
  }

  //ova metoda sluzi da regulise alerte kada nisu podeseni datum ili zaposleni
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
    this.selectedDate = null; //restartuje datum
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
    console.log(`Confirmed appointment with ${employee} on ${date} at ${time}`);
    // Logiku dodati ovdee, pa ajde
    const userEmail = this.authService.getUserEmail();
    if (userEmail) {
      this.appointmentService.addAppointment(userEmail, employee, date, time).subscribe(
        () => {
          console.log(`Appointment confirmed with ${employee} on ${date} at ${time}`);
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
