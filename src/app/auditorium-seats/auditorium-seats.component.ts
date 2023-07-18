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
  constructor(private http: HttpClient) { }
  seatLists: any[] = []
  rowLists: any[] = []
  selectedSeats: Seat[] = [];
  categoryData: any[] = [];

  ngOnInit(): void {
    this.getDataFromJSONFile().subscribe((response: any) => {
      this.categoryData = response['data']
      response['data'].forEach((data: any) => {
        // this.categoryData.push(data['name'])
        data['rowList'].forEach((rowList: any) => {
          this.rowLists.push(rowList);
        });
      });
      console.log("Category name: ", this.categoryData)
      console.log("Row List: ", this.rowLists);
      console.log("Seat List: ", this.rowLists);
    });
  }
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

  getDataFromJSONFile() {
    return this.http.get('../../assets/atoz_seat_data_new.json');
  }


}
