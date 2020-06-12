import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  vegetables: any[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get('https://test-schema.herokuapp.com/vegetables')
      .subscribe((response: any) => {
        this.vegetables = response.data;
        this.veggieCalculation();
      });
  }

  veggieCalculation() {
    const totalPrice = this.vegetables.reduce((sum, veggie) => sum + veggie.price, 0);
    console.log('Total price: ' + totalPrice);

    this.vegetables.map((veggie, index) => {
      this.vegetables[index].price = (veggie.price * .15) + veggie.price;
    });
    console.log(this.vegetables);

    const filterVeggies = this.vegetables.filter(x => x.price > 50);
    console.log(filterVeggies);
  }
}
