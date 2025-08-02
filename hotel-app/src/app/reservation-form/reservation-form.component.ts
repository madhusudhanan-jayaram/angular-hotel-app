import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HomeComponent],
  providers: [FormBuilder],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent {
  reservationForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, 
              private reservationService  : ReservationService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    console.log('ReservationFormComponent initialized');
    // Initialize the form with validation
    this.reservationForm = this.formBuilder.group({
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      roomNumber: ['', Validators.required]
    }); 
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // If an ID is present, fetch the reservation details for editing
      const reservation = this.reservationService.getReservationById(id);
      if (reservation) {
        this.reservationForm.patchValue(reservation);
      }
    }
  }
  onSubmit(): void {
    console.log('Form Submitted', this.reservationForm.value);
    if (this.reservationForm.valid) {
      console.log('Reservation Details:', this.reservationForm.value);
      let id = this.route.snapshot.paramMap.get('id');
      let reservation: Reservation = this.reservationForm.value;
      if (id) {
        // If an ID is present, update the existing reservation
        this.reservationService.updateReservation(id, reservation);
        console.log('Reservation updated successfully');
      } else {
        // If no ID is present, add a new reservation
        this.reservationService.addReservation(reservation);
        console.log('Reservation added successfully');
      }
      this.reservationForm.reset(); // Reset the form after submission
      this.router.navigate(['/list']); // Navigate to the reservation list
    } else {
      console.log('Form is invalid');
    }
  }
}
