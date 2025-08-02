import { Component } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';
import {DatePipe} from '@angular/common';
import {CommonModule} from '@angular/common';
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, DatePipe, HomeComponent],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations();
    if (this.reservations.length === 0) {
      console.log('No reservations found.'); 
    } else {
      console.log('Reservations loaded:', this.reservations);
    }
  }

  deleteReservation(id: string) {
    console.log('Deleting reservation with ID:', id);
    this.reservationService.deleteReservation(id);
    this.reservations = this.reservationService.getReservations();
    console.log('Reservation deleted successfully. Updated list:', this.reservations);
  }

  editReservation(id: string) {
    console.log('Editing reservation with ID:', id);
    // Logic to navigate to the edit form can be added here
    // For example, using Angular Router to navigate to the edit page
  }
}
