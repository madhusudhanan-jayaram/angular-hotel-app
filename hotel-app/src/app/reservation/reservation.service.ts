import { Injectable, model } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[] = [];
  private apiUrl = 'http://localhost:3000'; // Replace with your actual API URL

  constructor(private http: HttpClient) {
      console.log("ReservationService initialized");
  }

  //CRUD Operations
  addReservation(reservation: Reservation): void {
    reservation.id = new Date().getTime().toString(); // Generate a unique ID based on timestamp
    console.log('Adding reservation:', reservation);
    this.reservations.push(reservation);
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + '/reservations');
  }

  getReservationById(id: string): Observable<Reservation | undefined> {
    return this.http.get<Reservation>(this.apiUrl + '/reservation/' + id);
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    const index = this.reservations.findIndex(reservation => reservation.id === id);
    if (index !== -1) {
      this.reservations[index] = updatedReservation;
    }

  }

  deleteReservation(id: string): Observable<Reservation> {
    return this.http.delete<Reservation>(this.apiUrl + '/reservation/' + id);
  }


}
