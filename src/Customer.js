class Customer {
  constructor(customer, allBookings){
    this.name = customer.name;
    this.id = customer.id;
    this.myBookings = [];
    this.allBookings = allbookings;
    this.totalSpent = 0;
    this.numBookings = 0;
    this.username = `customer${this.id}`;
    this.password = "overlook2021";
  }

  //function that creates myBookings
  //function that creates totalSpent by customer
  //function that creates numBookings by customer
}

export default Customer;
