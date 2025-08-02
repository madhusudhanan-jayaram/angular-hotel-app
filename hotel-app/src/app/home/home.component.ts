import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservationComponent } from '../reservation/reservation.component';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReservationComponent, ReservationFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
