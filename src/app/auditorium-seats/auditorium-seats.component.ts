import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Seat {
  row: string;
  number: number;
  selected: boolean;
  reserved: boolean;
  booked: boolean;
  handicap: boolean;
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
export class AuditoriumSeatsComponent implements OnInit {
  constructor(private http: HttpClient){}
  seatLists: any[]=[]
  rowLists: any[]=[]
  selectedSeats: Seat[] = [];

  ngOnInit(): void {
    this.getDataFromJSONFile().subscribe((response: any) => {
      console.log(response['data']);
      response['data'].forEach((data:any) => {
        data['rowList'].forEach((rowList:any) => {
          this.rowLists.push(rowList);
        });
      });
      console.log("Seat List: ", this.rowLists)
    });
  }

  // rows: Row[] = [
  //   {
  //     name: 'A',
  //     seats: [
  //       { row: 'A', number: 1, selected: false, reserved: false, booked: false, handicap: false },
  //       { row: 'A', number: 2, selected: false, reserved: true, booked: false, handicap: false },
  //       { row: 'A', number: 3, selected: false, reserved: true, booked: true, handicap: true },
  //       // ... add more seat objects for row A
  //     ]
  //   },
  //   {
  //     name: 'B',
  //     seats: [
  //       { row: 'B', number: 1, selected: false, reserved: false, booked: true, handicap: false },
  //       { row: 'B', number: 2, selected: false, reserved: false, booked: false, handicap: true },
  //       { row: 'B', number: 3, selected: false, reserved: false, booked: true, handicap: false },
  //       // ... add more seat objects for row B
  //     ]
  //   },
  //   // ... add more row objects
  // ];

  selectSeat(seat: any) {
    if (seat.seatStatus === 'AVAILABLE') {
      seat.selected = !seat.selected;
      if (seat.selected) {
        this.selectedSeats.push(seat);
        console.log("Selected Seats: ", this.selectedSeats)
      } else {
        const index = this.selectedSeats.findIndex(s => s.row === seat.row && s.number === seat.number);
        if (index !== -1) {
          this.selectedSeats.splice(index, 1);
        }
      }
    }
  }

  // selectSeat(seat: any) {
  //   if (seat.seatStatus === 'AVAILABLE') {
  //     seat.selected = !seat.selected;
  //     if (seat.selected) {
  //       this.selectedSeats.push(seat)
  //     } else {
  //     }
  //   }
  // }


  getDataFromJSONFile() {
    return this.http.get('../../assets/seat_data.json');
  }


}
