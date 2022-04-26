class Customer {
  constructor(customer, allBookings){
    this.name = customer.name;
    this.id = customer.id;
    this.myBookings = [];
    this.allBookings = allBookings;
    this.totalSpent = 0;
    this.numBookings = 0;
    this.username = `customer${this.id}`;
    this.password = "overlook2021";
  }

  updateMyBookings() {
    let myBookingsList = this.allBookings.allBookingsMaster.reduce((acc, booking) => {
      if(booking.customerID === this.id) {
        acc.push(booking);
      };
      return acc;
    },[]);

    this.myBookings = myBookingsList;

    this.numBookings = this.myBookings.length;

    let moneySpent = this.myBookings.reduce((total, booking) => {
      total += booking.roomCost;
      return total;
    }, 0);

    this.totalSpent = (Math.round(moneySpent * Math.pow(10,2)) / Math.pow(10,2)).toFixed(2);

    this.myBookings.sort((a, b) => {
      return b.timeStamp - a.timeStamp;
    });
  };
}

export default Customer;
