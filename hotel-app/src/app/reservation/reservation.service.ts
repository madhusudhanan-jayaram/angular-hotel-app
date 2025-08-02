import { Injectable, model } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor() {
      console.log("ReservationService initialized");
      let savedReservations = localStorage.getItem('reservations');
      this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
      console.log('** Number of reservations stored **' + this.reservations.length);
  }

  //CRUD Operations
  addReservation(reservation: Reservation): void {
    reservation.id = new Date().getTime().toString(); // Generate a unique ID based on timestamp
    console.log('Adding reservation:', reservation);
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservationById(id: string): Reservation | undefined {
    return this.reservations.find(reservation => reservation.id === id);
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    const index = this.reservations.findIndex(reservation => reservation.id === id);
    if (index !== -1) {
      this.reservations[index] = updatedReservation;
    }
        localStorage.setItem('reservations', JSON.stringify(this.reservations));

  }
  
  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(reservation => reservation.id === id);
    if (index !== -1) {
      this.reservations.splice(index, 1);
    }
        localStorage.setItem('reservations', JSON.stringify(this.reservations));

  }


}
