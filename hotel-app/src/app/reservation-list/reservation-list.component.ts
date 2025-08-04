import { Component } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';
import {DatePipe} from '@angular/common';
import {CommonModule} from '@angular/common';
import { HomeComponent } from "../home/home.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, DatePipe, HomeComponent, RouterModule],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        if (this.reservations.length === 0) {
          console.log('No reservations found.');
        } else {
          console.log('Reservations loaded:', this.reservations);
        }
      },
      error: (err) => {
        console.error('Error loading reservations:', err);
      }
    });
  }

  deleteReservation(id: string) {
    console.log('Deleting reservation with ID:', id);
    this.reservationService.deleteReservation(id);
    console.log('Reservation deleted successfully. Updated list:', this.reservations);
  }


}
