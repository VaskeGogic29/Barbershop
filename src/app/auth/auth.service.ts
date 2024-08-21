import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';//pazii ovde


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isUserAuthenticated = false;
  private adminEmail='admin29@gmail.com';
  private firebaseUrl = 'https://frizer-be310-default-rtdb.europe-west1.firebasedatabase.app';
  private apiKey = 'AIzaSyCHfZz0_u0CWYZEpIjn_gt611_dghrQyZE';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  get isUserAuthenticated(): boolean {
    return this._isUserAuthenticated || !!localStorage.getItem('userToken');
  }

  
  
  logIn(email: string, password: string) {
    const userPayload = { email, password, returnSecureToken: true };
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, userPayload)
      .toPromise()
      .then((response: any) => {
        this._isUserAuthenticated = true;
        const idToken = response.idToken;
        localStorage.setItem('userToken', idToken);
        localStorage.setItem('userEmail', email);

        if (email === this.adminEmail) {
          this.router.navigateByUrl('/employee-management');
        } else {
          this.router.navigateByUrl('/pocetna');
        }

        return idToken;
      })
      .catch((error) => {
        console.error('Login error:', error);
        throw error;
      });
  }
  
  

  logOut() {
    this._isUserAuthenticated = false;
    localStorage.removeItem('userToken');
    this.router.navigateByUrl('/login');
  }

  


  register(name: string, surname: string, email: string, password: string) {
    const userPayload = { email, password, returnSecureToken: true };
  
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, userPayload)
      .toPromise()
      .then(response => {
        console.log('Registration successful', response);
        const userId = response.localId;
        const idToken = response.idToken;
        localStorage.setItem('userToken', idToken);
        localStorage.setItem('userEmail', email);
        const userData = { name, surname, email };
  
        return this.storeUserData(userId, userData, idToken);
      })
      .then(() => {
        console.log('User data stored successfully');
        this._isUserAuthenticated = true;
        this.router.navigateByUrl('/pocetna');
      })
      .catch(error => {
        console.error('Registration error or user data storage error:', error);
        throw error;
      });
  }
  
  

  private storeUserData(userId: string, userData: { name: string, surname: string, email: string }, idToken: string) {
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${idToken}`);
    return this.http.put(`${this.firebaseUrl}/users/${userId}.json?auth=${idToken}`, userData, { headers })
      .toPromise()
      .then(() => {
        console.log('User data successfully stored in the database');
      })
      .catch((error) => {
        console.error('Error storing user data in the database:', error);
        throw error;
      });
  }

  autoLogin() {
    const userToken = localStorage.getItem('userToken');
    console.log('Auto-login token:', userToken); // Debugging line pazi ovde
    if (userToken) {
      this._isUserAuthenticated = true;
      this.router.navigateByUrl('/pocetna');
    }else {
      this.router.navigateByUrl('/login');
    }
  }

  //PAZI OVOOO

  // Method to get the token from localStorage
  private getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  // Method to extract user email from the token
  getUserEmail(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = token.split('.')[1]; // Get the payload part of the JWT
        const decoded = JSON.parse(atob(payload)); // Decode the Base64 part
        return decoded.email; // Return the email from the payload
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null
  }
  

  
}







