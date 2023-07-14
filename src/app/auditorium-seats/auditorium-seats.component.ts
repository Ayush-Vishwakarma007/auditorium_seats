import { Component } from '@angular/core';

interface Seat {
  row: string;
  number: number;
  selected: boolean;
  reserved: boolean;
  booked: boolean;
}

interface Row {
  name: string;
  seats: Seat[];
}

@Component({
  selector: 'app-auditorium-seats',
  templateUrl: './auditorium-seats.component.html',
  styleUrls: ['./auditorium-seats.component.scss']
})
export class AuditoriumSeatsComponent {
  rows: Row[] = [
    {
      name: 'A',
      seats: [
        { row: 'A', number: 1, selected: false, reserved: false, booked: false },
        { row: 'A', number: 2, selected: false, reserved: true, booked: false },
        { row: 'A', number: 3, selected: false, reserved: false, booked: true },
        // ... add more seat objects for row A
      ]
    },
    {
      name: 'B',
      seats: [
        { row: 'B', number: 1, selected: false, reserved: false, booked: true },
        { row: 'B', number: 2, selected: false, reserved: false, booked: false },
        { row: 'B', number: 3, selected: false, reserved: false, booked: true },
        // ... add more seat objects for row B
      ]
    },
    // ... add more row objects
  ];
  selectedSeats: Seat[] = [];

  selectSeat(seat: Seat) {
    if (!seat.reserved && !seat.booked) {
      seat.selected = !seat.selected;
      if (seat.selected) {
        this.selectedSeats.push(seat);
      } else {
        const index = this.selectedSeats.findIndex(s => s.row === seat.row && s.number === seat.number);
        if (index !== -1) {
          this.selectedSeats.splice(index, 1);
        }
      }
    }
  }

}
