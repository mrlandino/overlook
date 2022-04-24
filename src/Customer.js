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
    this.currentDate = new Date().getTime();
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
          // if (booking.timeStamp >= this.currentDate) {
          //   booking.bookingStatus = "upcoming";
          // } else {
          //   booking.bookingStatus = "completed";
          // }
        });
      };
    });

    this.updateDateToSort();
    // ALSO  MAY TRY TO DISPLAY AN UPCOMING BOOKINGS VS. PAST
    this.myBookings.sort((a, b) => {
      return b.timeStamp - a.timeStamp;
    })

    this.myBookings.map(booking => {
      this.allRooms.allRooms.rooms.forEach(room => {
        if (booking.timeStamp >= this.currentDate) {
          booking.bookingStatus = "upcoming";
        } else {
          booking.bookingStatus = "completed";
        }
      })
    })
  }

  updateDateToSort() {
    this.myBookings.forEach(booking => {
      booking.timeStamp = new Date(booking.date).getTime();
      booking.displayDate = new Date(booking.timeStamp).toDateString();
    })
    console.log("UPDATED TIME STAMP", this.myBookings)
  }
}

export default Customer;
