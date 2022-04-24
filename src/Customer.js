class Customer {
  constructor(customer, allBookings, allRooms){
    this.name = customer.name;
    this.id = customer.id;
    this.myBookings = [];
    this.allBookings = allBookings;
    this.allRooms = allRooms;
    this.totalSpent = 0;
    this.numBookings = 0;
    this.username = `customer${this.id}`;
    this.password = "overlook2021";
  }

  updateMyBookings() {
    // this.myBookings = [];
    // console.log(this.allBookings.bookings);
    this.allBookings.bookings.filter(booking => {
      if(booking.userID === this.id) {
        this.myBookings.push(booking);
      }
    });
    this.numBookings = this.myBookings.length;

    let moneySpent = this.myBookings.reduce((total, booking) => {
      this.allRooms.allRooms.rooms.forEach(room => {
          total += room.costPerNight;
      })
      return total;
    }, 0)

    this.totalSpent = (Math.round(moneySpent * Math.pow(10,2)) / Math.pow(10,2)).toFixed(2);

    this.myBookings.map(booking => {
      if(!booking.roomCost) {
        this.allRooms.allRooms.rooms.forEach(room => {
          if(room.number === booking.roomNumber){
          booking.roomCost = room.costPerNight;
          booking.bedSize = room.bedSize;
          if(room.bidet) {
            booking.bidet = "yes";
          } else if (!room.bidet) {
            booking.bidet = "no";
          };
          booking.numBeds = room.numBeds;
          booking.roomType = room.roomType;
          }
        });
      };
    });

    //FIND A WAY TO SORT BY DATE BEFORE SENDING TO display
    // ALSO  MAY TRY TO DISPLAY AN UPCOMING BOOKINGS VS. PAST
    // this.myBookings.sort((a, b) => {
    //   return a.date - b.date;
    // })
  }


  //function that creates totalSpent by customer
  //function that creates numBookings by customer
}

export default Customer;
