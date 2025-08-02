import { Component } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';
import {DatePipe} from '@angular/common';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
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
}
