import Booking from './Booking';

class BookingsRepo {
  constructor(bookings, allRooms) {
    this.bookings = bookings.bookings;
    this.allRooms = allRooms;
    this.roomsAvailable = [];
    this.allBookingsMaster = this.updateBookingsMaster();
    //create allRoomInfo
  }

  updateBookingsMaster() {
    let updatedList = this.bookings.reduce((acc, booking) => {
      this.allRooms.allRooms.rooms.forEach(room => {
        if(room.number === booking.roomNumber) {
          acc.push(new Booking(room, booking))
        }
      })
      return acc;
    }, [])
    return updatedList;
  }


  // updateRoomsAvailable(date, type) {
  //   console.log("INPUT VALUES", date, type)
  //   if(date && roomTypeFilter) {
  //     console.log("SHOW ME MY ROOMS WITH BOTH INPUTS FILLED IN")
  //     //load bookings that filter by date AND room type
  //   } else if (date && !type) {
  //       this.allRooms.forEach(room => {
  //         this.bookings.forEach(booking => {
  //           if(room.number === booking.roomNumber && booking.date !== date) {
  //             this.roomsAvailable.push({
  //               roomNumber: "PLUG room Number",
  //               roomType: "PLUG room Type",
  //               bidet: "PLUG bidet yes or no",
  //               bedSize: "PLUG bed size",
  //               numOfBeds: "PLUG number of beds",
  //               costPerNight: "PLUG cost per night"});
  //           } else if(room.number ===)
  //
  //           //if the room we currently looking at:
  //           //doesnt exist in the bookings
  //           //as long as the room and date dont match bookings room and date
  //         })
  //       })
  //     //load bookings by just the date
  //   } else if (!date && type) {
  //     console.log("SHOW ME MY ROOMS WITH TYPE INPUT FILLED IN")
  //   }
}
  //combine all room information and booking information
  //.filter Date
  //.filter by Type


export default BookingsRepo;
