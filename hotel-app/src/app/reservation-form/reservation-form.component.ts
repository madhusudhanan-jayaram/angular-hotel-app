import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [FormBuilder],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent {
  reservationForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, 
              private reservationService  : ReservationService,
              private router: Router) {
   
  }

  ngOnInit(): void {
    console.log('ReservationFormComponent initialized');
    // Initialize the form with validation
 this.reservationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      roomNumber: ['', Validators.required]
    });  }
  onSubmit(): void {
    console.log('Form Submitted', this.reservationForm.value);
    if (this.reservationForm.valid) {
      console.log('Reservation Details:', this.reservationForm.value);
      let reservation: Reservation = this.reservationForm.value;
      this.reservationService.addReservation(this.reservationForm.value);
      console.log('Reservation added successfully');
      this.reservationForm.reset(); // Reset the form after submission
      this.router.navigate(['/list']); // Navigate to the reservation list
    } else {
      console.log('Form is invalid');
    }
  }
}
